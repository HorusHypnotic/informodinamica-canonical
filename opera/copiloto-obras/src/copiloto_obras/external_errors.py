import re


_SAFE_CORRELATION = re.compile(r"^[A-Za-z0-9._-]{1,64}$")


class ExternalTransportError(RuntimeError):
    def __init__(self, *, status_code: int | None = None, correlation_id: str | None = None) -> None:
        self.category = "EXTERNAL_TRANSPORT"
        self.code = "EXT-001"
        self.status_code = status_code if isinstance(status_code, int) and 100 <= status_code <= 599 else None
        self.correlation_id = correlation_id if isinstance(correlation_id, str) and _SAFE_CORRELATION.fullmatch(correlation_id) else None
        details = [self.category, self.code]
        if self.status_code is not None:
            details.append(f"HTTP-{self.status_code}")
        if self.correlation_id is not None:
            details.append(f"CORRELATION-{self.correlation_id}")
        super().__init__(": ".join(details))


def sanitized_transport_error(error: Exception) -> ExternalTransportError:
    try:
        status_code = getattr(error, "status_code", None)
    except Exception:
        status_code = None
    try:
        correlation_id = getattr(error, "correlation_id", None) or getattr(error, "request_id", None)
    except Exception:
        correlation_id = None
    return ExternalTransportError(status_code=status_code, correlation_id=correlation_id)
