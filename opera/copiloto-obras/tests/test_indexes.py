from dataclasses import dataclass

import pytest

from copiloto_obras.indexes import build_unique_index


@dataclass
class Item:
    id: str


def test_builds_index_and_preserves_identity():
    item = Item("info-1")
    other = Item("info-2")

    index = build_unique_index([item, other], entity_name="information")

    assert index == {"info-1": item, "info-2": other}
    assert index["info-1"] is item


def test_duplicate_id_raises_value_error():
    with pytest.raises(ValueError, match="information: ID duplicado: info-1"):
        build_unique_index([Item("info-1"), Item("info-1")], entity_name="information")


def test_empty_id_raises_value_error():
    with pytest.raises(ValueError, match="information: ID ausente ou vazio"):
        build_unique_index([Item("")], entity_name="information")


def test_missing_id_attribute_raises_value_error():
    with pytest.raises(ValueError, match="information: ID ausente ou vazio"):
        build_unique_index([object()], entity_name="information")
