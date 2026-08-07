import hashlib

import pytest

import copiloto_obras.composition as composition_module
from copiloto_obras.composition import load_composition, validated_composition_bytes


def test_files_are_read_once_and_snapshot_bytes_are_hashed(monkeypatch, tmp_path):
    canonical = tmp_path / "canonical.md"
    profile = tmp_path / "profile.md"
    canonical.write_bytes(b"canonical-v1")
    profile.write_bytes(b"profile-v1")
    monkeypatch.setattr(composition_module, "required_canonical_paths", lambda _root: [canonical])
    monkeypatch.setattr(composition_module, "PROFILE_MODULES", ("profile.md",))
    original_read = type(canonical).read_bytes
    reads = {}

    def counted_read(path):
        reads[path] = reads.get(path, 0) + 1
        return original_read(path)

    monkeypatch.setattr(type(canonical), "read_bytes", counted_read)
    composition = load_composition(tmp_path)
    canonical.write_bytes(b"canonical-trocado")
    profile.write_bytes(b"profile-trocado")

    assert reads == {canonical: 1, profile: 1}
    assert validated_composition_bytes(composition) == b"canonical-v1\n\nprofile-v1"
    assert composition.modules[0].sha256 == hashlib.sha256(b"canonical-v1").hexdigest()


def test_tampered_snapshot_is_rejected_without_rereading_disk():
    from copiloto_obras.models import CompositionManifest, CompositionResult, ModuleRecord

    record = ModuleRecord(path="x", sha256=hashlib.sha256(b"original").hexdigest(), snapshot_bytes=b"alterado")
    composition = CompositionManifest(result=CompositionResult.VALIDA, modules=[record])
    with pytest.raises(ValueError, match="Snapshot"):
        validated_composition_bytes(composition)


def test_snapshot_and_hash_cannot_be_swapped_behind_manifest():
    from copiloto_obras.composition import calculate_manifest_sha256
    from copiloto_obras.models import CompositionManifest, CompositionResult, ModuleRecord

    original = ModuleRecord(path="x", sha256=hashlib.sha256(b"original").hexdigest(), snapshot_bytes=b"original")
    manifest_hash = calculate_manifest_sha256("copiloto_obras.v0.1", [original])
    swapped = ModuleRecord(path="x", sha256=hashlib.sha256(b"swapped").hexdigest(), snapshot_bytes=b"swapped")
    composition = CompositionManifest(result=CompositionResult.VALIDA, modules=[swapped], manifest_sha256=manifest_hash)
    with pytest.raises(ValueError, match="Manifesto"):
        validated_composition_bytes(composition)
