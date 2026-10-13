"""In-memory synthetic event-ledger prototype, not production storage."""
from dataclasses import dataclass
from typing import Dict, Tuple


class EventConflict(ValueError):
    pass


@dataclass(frozen=True)
class Event:
    event_id: str
    opportunity_id: str
    kind: str
    payload: Tuple[Tuple[str, str], ...]


class SyntheticLedger:
    def __init__(self):
        self._events: Dict[str, Event] = {}
        self._order = []

    def append(self, event: Event) -> str:
        if not event.event_id or not event.opportunity_id:
            raise ValueError("event_id and opportunity_id required")
        previous = self._events.get(event.event_id)
        if previous is not None:
            if previous == event:
                return "NOOP"
            raise EventConflict("same EVENT_ID with different content")
        self._events[event.event_id] = event
        self._order.append(event.event_id)
        return "APPENDED"

    def history(self, opportunity_id: str):
        return tuple(self._events[k] for k in self._order if self._events[k].opportunity_id == opportunity_id)

    def all_events(self):
        return tuple(self._events[k] for k in self._order)
