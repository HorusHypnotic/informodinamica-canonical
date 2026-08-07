def validate_item_scope(
    item: object,
    *,
    company_id: str,
    worksite_id: str,
    period: object,
) -> None:
    """Validate that an item belongs exactly to the authorized scope."""
    item_company_id = getattr(item, "company_id", None)
    item_worksite_id = getattr(item, "worksite_id", None)
    item_period = getattr(item, "period", None)

    if not isinstance(item_company_id, str) or not item_company_id.strip():
        raise ValueError("escopo: company_id ausente ou vazio")
    if not isinstance(item_worksite_id, str) or not item_worksite_id.strip():
        raise ValueError("escopo: worksite_id ausente ou vazio")
    if item_period is None or (isinstance(item_period, str) and not item_period.strip()):
        raise ValueError("escopo: period ausente ou vazio")
    if item_company_id != company_id:
        raise ValueError("escopo: empresa divergente")
    if item_worksite_id != worksite_id:
        raise ValueError("escopo: obra divergente")
    if item_period != period:
        raise ValueError("escopo: período divergente")
