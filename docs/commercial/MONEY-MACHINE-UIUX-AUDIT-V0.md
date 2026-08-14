# Money Machine UI/UX Audit V0

## Veredito

A página atual é um bom inventário narrativo do patrimônio, mas uma superfície de conversão fraca. O visitante vê pesquisa, core, catálogo, PDIC, preços, diagnóstico, interesse, evidência, responsável e contato numa única página. A intenção editorial é honesta; a hierarquia comercial não responde rapidamente “o que posso comprar agora, o que recebo e o que acontece depois?”.

## Achados ligados ao funil

| Achado | Efeito | Recomendação futura |
|---|---|---|
| 12 produtos selecionáveis | equivalência aparente entre ativo, protótipo e oferta | formulário comercial deve listar apenas ofertas ativas |
| quatro modelos/faixas de preço | sinal comercial forte, mas escopo desigual | uma página por oferta com deliverable, critérios e próximo passo |
| diagnóstico gratuito e “análise inicial” paga compartilham linguagem | risco de não entender o que R$197 compra | distinguir `CHECKLIST PRELIMINAR GRATUITO` de `DIAGNÓSTICO PAGO` |
| CTA principal leva ao diagnóstico, não à compra | qualifica, mas não forma pedido | CTA da oferta ativa deve criar pedido |
| formulário bloqueado | conversão impossível | MM-01 deve definir oferta; correção do formulário não basta sem domínio de pedido |
| métricas públicas sem dados disponíveis | pode reduzir confiança | ocultar por ausência ou mostrar estado verificável; não inventar números |
| claims “como reconstruir e provar” | risco de exceder evidência técnica | usar linguagem proporcional ao checkpoint do sistema |
| pesquisa e patrimônio misturados à venda | aumenta carga cognitiva | separar navegação comercial e institucional |

## Qualidade observável

- **Mobile:** regras responsivas existem para grids, menu, formulários e CTAs; não houve teste humano nesta missão.
- **Acessibilidade:** skip link, labels, `aria-live`, `aria-expanded`, alt text e reduced motion são pontos positivos. Faltam evidências de teste de teclado, contraste, leitor de tela e mensagens de erro completas.
- **Performance:** site estático e imagens lazy abaixo do hero favorecem desempenho; tamanho/otimização de imagens e métricas de campo não foram medidos.
- **Segurança:** Turnstile foi previsto e consentimento é obrigatório, mas a configuração bloqueia o formulário; frontend público não pode ser autoridade sobre status comercial.
- **Consistência:** identidade visual é coesa; consistência de maturidade/oferta é o problema central.

## Arquitetura de informação futura

```text
HOME
├── OFERTAS — somente o que pode ser contratado
│   └── OFERTA → DETALHES → CONTRATAR → PEDIDO → PIX → COMPROVANTE → STATUS
├── SOLUÇÕES — problemas e rotas assistidas
├── PROVAS — casos/evidências verificáveis, sem claims excessivos
├── TECNOLOGIA — patrimônio, demos e sistemas
├── PESQUISA — Informodinâmica/TPC/TDO
└── SOBRE
```

GitHub Pages pode continuar como storefront. A jornada transacional deve usar backend mínimo; não é necessário outro frontend/app no V0. Nenhum redesign foi implementado.
