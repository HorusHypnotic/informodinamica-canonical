from typing import Iterable, Protocol, TypeVar


class HasId(Protocol):
    id: str


T = TypeVar("T", bound=HasId)


def build_unique_index(items: Iterable[T], *, entity_name: str) -> dict[str, T]:
    """Build an ID index without silently accepting absent or duplicated IDs."""
    index: dict[str, T] = {}
    for item in items:
        item_id = getattr(item, "id", None)
        if not isinstance(item_id, str) or not item_id.strip():
            raise ValueError(f"{entity_name}: ID ausente ou vazio")
        if item_id in index:
            raise ValueError(f"{entity_name}: ID duplicado: {item_id}")
        index[item_id] = item
    return index
