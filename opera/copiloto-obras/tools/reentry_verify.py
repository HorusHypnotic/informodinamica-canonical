from __future__ import annotations

import json
import platform
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def run(cmd: list[str], cwd: Path | None = None) -> dict:
    proc = subprocess.run(
        cmd,
        cwd=cwd or ROOT,
        text=True,
        capture_output=True,
        check=False,
    )
    return {
        "command": cmd,
        "returncode": proc.returncode,
        "stdout": proc.stdout,
        "stderr": proc.stderr,
    }


def main() -> int:
    evidence = {
        "mission": "COPILOTO-OBRAS-REENTRY-001",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "python": sys.version,
        "python_executable": sys.executable,
        "platform": platform.platform(),
        "repo_root": str(ROOT),
        "git_head": run(["git", "rev-parse", "HEAD"]),
        "git_status": run(["git", "status", "--short"]),
        "pytest_version": run([sys.executable, "-m", "pytest", "--version"]),
        "historical_suite": run([sys.executable, "-m", "pytest", "-q"]),
    }
    out_dir = ROOT / "audits"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "COPILOTO-OBRAS-REENTRY-001-historical-suite.json"
    out_path.write_text(json.dumps(evidence, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(evidence, ensure_ascii=False, indent=2))
    return evidence["historical_suite"]["returncode"]


if __name__ == "__main__":
    raise SystemExit(main())
