from dataclasses import dataclass
import os
from pathlib import Path

from dotenv import load_dotenv


@dataclass(frozen=True)
class RuntimeConfig:
    openai_api_key: str | None
    openai_model: str | None
    timeout_seconds: float
    max_retries: int
    log_level: str


def load_config(env_file: Path | None = None) -> RuntimeConfig:
    if env_file is not None:
        load_dotenv(env_file, override=False)
    return RuntimeConfig(
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        openai_model=os.getenv("OPENAI_MODEL"),
        timeout_seconds=float(os.getenv("OPENAI_TIMEOUT_SECONDS", "60")),
        max_retries=int(os.getenv("OPENAI_MAX_RETRIES", "2")),
        log_level=os.getenv("OPERA_LOG_LEVEL", "INFO"),
    )
