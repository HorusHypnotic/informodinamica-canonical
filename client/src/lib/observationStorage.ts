import {
  getDefaultObservationDraft,
  LEGACY_DRAFT_STORAGE_KEY,
  OBSERVATIONS_STORAGE_KEY,
  type LocalObservation,
  type ObservationDraft,
} from "@/types/observation";

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function normalizeDraft(value: Partial<ObservationDraft>): ObservationDraft {
  return {
    ...getDefaultObservationDraft(),
    ...value,
    title: typeof value.title === "string" ? value.title : "",
    date: typeof value.date === "string" ? value.date : getDefaultObservationDraft().date,
    location: typeof value.location === "string" ? value.location : "",
    domain: typeof value.domain === "string" ? value.domain : "",
    quality: typeof value.quality === "string" ? value.quality : "",
    rawDescription: typeof value.rawDescription === "string" ? value.rawDescription : "",
    observedResult: typeof value.observedResult === "string" ? value.observedResult : "",
    openQuestions: typeof value.openQuestions === "string" ? value.openQuestions : "",
    lastSaved: typeof value.lastSaved === "string" ? value.lastSaved : "",
  };
}

export function loadDraft(): ObservationDraft {
  const legacyDraft = readJson<Partial<ObservationDraft>>(LEGACY_DRAFT_STORAGE_KEY);
  return legacyDraft ? normalizeDraft(legacyDraft) : getDefaultObservationDraft();
}

export function saveDraft(draft: ObservationDraft): boolean {
  return writeJson(LEGACY_DRAFT_STORAGE_KEY, draft);
}

export function clearDraft(): void {
  localStorage.removeItem(LEGACY_DRAFT_STORAGE_KEY);
}

export function loadObservations(): LocalObservation[] {
  const stored = readJson<unknown>(OBSERVATIONS_STORAGE_KEY);
  if (!Array.isArray(stored)) return [];
  return stored.filter((item): item is LocalObservation => {
    if (!item || typeof item !== "object") return false;
    const observation = item as Partial<LocalObservation>;
    return (
      typeof observation.id === "string" &&
      typeof observation.title === "string" &&
      typeof observation.eventDate === "string" &&
      typeof observation.createdAt === "string" &&
      observation.status === "registrada"
    );
  });
}

export function saveObservations(observations: LocalObservation[]): boolean {
  return writeJson(OBSERVATIONS_STORAGE_KEY, observations);
}

export function getNextObservationId(observations: LocalObservation[]): string {
  const highest = observations.reduce((max, observation) => {
    const match = /^OBS-LOCAL-(\d+)$/.exec(observation.id);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return `OBS-LOCAL-${String(highest + 1).padStart(4, "0")}`;
}

export function registerObservation(draft: ObservationDraft): LocalObservation | null {
  const observations = loadObservations();
  const observation: LocalObservation = {
    id: getNextObservationId(observations),
    title: draft.title.trim() || "Observação sem título",
    eventDate: draft.date,
    location: draft.location,
    domain: draft.domain,
    quality: draft.quality,
    rawDescription: draft.rawDescription,
    observedResult: draft.observedResult,
    openQuestions: draft.openQuestions,
    createdAt: new Date().toISOString(),
    status: "registrada",
  };

  return saveObservations([...observations, observation]) ? observation : null;
}

export function findObservation(id: string): LocalObservation | null {
  return loadObservations().find((observation) => observation.id === id) ?? null;
}
