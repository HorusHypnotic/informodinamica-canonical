"""Bot Telegram experimental (Gate 2) — ingestão real de mensagens.

- Modo webhook via Application.run_webhook (porta 8443) OU polling via
  Application.run_polling se WEBHOOK=0 (teste local).
- RAW-FIRST: cada mensagem é persistida no banco ANTES de qualquer
  interpretação, com source_message_id determinístico.
- Não ativa nenhuma rota candidate: o pipeline termina em
  SIMULATED_NOT_ACTIVATED (delivery BLOCKED).
- Token em GATE2_BOT_TOKEN (não commitado; só disponível em execução local).
"""
from __future__ import annotations

import asyncio
import logging
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from telegram import Update
from telegram.error import Conflict, InvalidToken
from telegram.ext import (Application, ContextTypes, MessageHandler,
                          filters)

from operagw.pipeline import GatewayPipeline
from operagw.storage import Store
from operagw.envelope import utcnow_iso

TELEGRAM_TOKEN = os.environ.get("GATE2_BOT_TOKEN")
TENANT = os.environ.get("GATE2_TENANT",
                        "tenant:manus-qa:dirceu-engenharia:"
                        "galpao-quadruplo-domingos")
WORK_HINT = os.environ.get("GATE2_WORK_HINT", "galpao-quadruplo-domingos")
DB_PATH = os.environ.get("GATE2_DB", "/home/ubuntu/opera-gateway/runtime-data/telegram.db")
PORT = int(os.environ.get("WEBHOOK_PORT", 8443))
USE_WEBHOOK = os.environ.get("WEBHOOK", "0") != "0"

logging.basicConfig(format="%(asctime)s [%(name)s] %(levelname)s %(message)s",
                    level=logging.INFO)
LOG = logging.getLogger("operagw.telegram")


def source_message_id(update: Update) -> str:
    chat_id = update.effective_chat.id
    return f"telegram:{chat_id}:{update.effective_message.message_id}"


def extract_text(update: Update) -> str:
    """Texto bruto da mensagem; anexos ficam como attachments no raw."""
    msg = update.effective_message
    parts = [msg.text or ""]
    attachments = []
    if msg.document:
        attachments.append({"type": "document",
                            "file_name": msg.document.file_name})
    if msg.photo:
        attachments.append({"type": "photo",
                            "n": len(msg.photo)})
    if msg.voice or msg.audio:
        kind = "voice" if msg.voice else "audio"
        attachments.append({"type": kind})
    attachments = attachments or None
    content = " ".join(p for p in parts if p).strip()
    return content, attachments


async def on_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    store = Store(DB_PATH)
    store.ensure_tenant(TENANT, "tenant de teste Gate 2")
    gw = GatewayPipeline(store)
    msg = update.effective_message
    content, attachments = extract_text(update)
    smid = source_message_id(update)
    LOG.info("raw: %s", content[:100])
    try:
        res = gw.ingest(
            tenant=TENANT, transport="telegram",
            channel_account_id=f"bot{update.effective_chat.type or 'private'}",
            channel_message_id=f"{update.effective_chat.id}-{msg.message_id}",
            actor=f"telegram:{update.effective_user.id}",
            raw_content=content,
            work_hint=WORK_HINT,
        )
        if attachments:
            # anexos persistidos como attachments do raw (sem download no G2:
            # foto/áudio fora do escopo v0.1)
            pkg = store.get_package(res.package_id)
            env = pkg["envelope"]
            env["raw"]["attachments"] = attachments
            store.update_package(res.package_id, env)
    except Exception:
        LOG.exception("ingest falhou")
        await update.effective_message.reply_text(
            "Recebi sua mensagem, mas o processamento falhou "
            "(falha registrada em audit; nenhum dado foi perdido).")
        return

    pkg = store.get_package(res.package_id)
    env = pkg["envelope"]
    if res.stage in ("REJECTED_PRE_INTERPRETATION", "SCHEMA_REJECTED"):
        await update.effective_message.reply_text(
            "Sua mensagem foi registrada, mas não consegui interpretar um "
            "fato de obra nela. Nada foi enviado a nenhum sistema.")
    elif env["confirmation"]["state"] == "NEEDS_CONFIRMATION":
        qid = env["confirmation"]["question_id"]
        await update.effective_message.reply_text(
            "Interpretei sua mensagem. Antes de registrar: "
            "você confirma o que entendi? Responda SIM para confirmar, "
            "ou escreva a correção. (Pergunta: " + qid + ")")
    elif env["confirmation"]["state"] == "EXPIRED":
        await update.effective_message.reply_text(
            "Sua mensagem expirou sem confirmação. Nada foi enviado.")
    else:
        dests = [d["system"] for d in env["routing"]["destinations"]]
        await update.effective_message.reply_text(
            "Registrado e confirmado. Destinos esperados (ainda não ativos "
            "neste experimento): " + ", ".join(dests) or "triagem")


def reply_to_question(update: Update, _context):
    """Respostas livres de texto são tratadas como resposta de confirmação
    quando há uma pergunta em aberto para o usuário."""
    store = Store(DB_PATH)
    rows = store._conn().execute(
        "SELECT package_id, envelope_json FROM packages WHERE tenant = ? "
        "AND json_extract(envelope_json, '$.confirmation.state') = "
        "'NEEDS_CONFIRMATION' ORDER BY created_at DESC", (TENANT,)).fetchall()
    if not rows:
        return
    import json
    for pkg_id, env_json in rows:
        env = json.loads(env_json)
        qid = env.get("confirmation", {}).get("question_id")
        if not qid:
            continue
        # responde à pergunta mais recente aberta
        from operagw.confirmation import respond_confirmation
        try:
            out = respond_confirmation(store, qid, update.effective_message.text,
                                       f"telegram:{update.effective_user.id}")
            state = out["action"]
            if state == "CONFIRMED":
                asyncio.get_event_loop().create_task(
                    update.effective_message.reply_text(
                        "Confirmado. Nada foi enviado a nenhum sistema neste "
                        "experimento (rotas bloqueadas)."))
            elif state == "CORRECTED":
                asyncio.get_event_loop().create_task(
                    update.effective_message.reply_text(
                        "Correção registrada como novo pacote com lineage. "
                        "Nada foi enviado a nenhum sistema."))
            else:
                asyncio.get_event_loop().create_task(
                    update.effective_message.reply_text(
                        f"Ação registrada: {state}."))
            return
        except Exception:
            LOG.exception("respond_confirmation falhou")
    return


def main():
    if not TELEGRAM_TOKEN:
        LOG.error("GATE2_BOT_TOKEN não definido; bot não iniciado.")
        sys.exit(1)
    app = Application.builder().token(TELEGRAM_TOKEN).build()
    try:
        asyncio.get_event_loop().run_until_complete(app.bot.initialize())
    except InvalidToken:
        LOG.error("token rejeitado pelo Telegram. O bot não será iniciado. "
                  "Defina GATE2_BOT_TOKEN com um token válido obtido com "
                  "@BotFather (o token nunca é commitado).")
        return
    app.add_handler(MessageHandler(
        filters.PHOTO | filters.Document.ALL |
        filters.AUDIO | filters.VOICE | filters.TEXT,
        on_message))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND,
                                   reply_to_question))
    if USE_WEBHOOK:
        webhook_url = os.environ.get("GATE2_WEBHOOK_URL", "")
        if not webhook_url:
            LOG.error("WEBHOOK=1 mas GATE2_WEBHOOK_URL não definido; "
                      "iniciando polling como fallback de teste local.")
            app.run_polling(drop_pending_updates=True)
            return
        LOG.info("iniciando webhook porta %d", PORT)
        app.run_webhook(
            listen="0.0.0.0", port=PORT,
            url_path=TELEGRAM_TOKEN.split(":")[0],
            webhook_url=webhook_url,
            secret_token=os.environ.get("GATE2_SECRET_TOKEN"))
    else:
        LOG.info("iniciando polling (teste local)")
        app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
