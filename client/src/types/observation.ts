export const LEGACY_DRAFT_STORAGE_KEY = "tpc-observation-draft";
export const OBSERVATIONS_STORAGE_KEY = "tpc-observations-corpus-v2";
export const ORGANIZATIONS_STORAGE_KEY = "tpc-organizations-corpus-v2";

export type ObservationStatus = "registrada" | "enriquecida";

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
}

export interface ObservationDraft {
  title: string;
  date: string;
  organizationName: string;
  locations: string[];
  domain: string;
  quality: string;
  rawDescription: string;
  observedResult: string;
  openQuestions: string;
  lastSaved: string;
}

export interface LocalObservation {
  id: string;
  title: string;
  eventDate: string;
  organizationName?: string;
  locations: string[];
  location?: string; // Retrocompatibilidade com registros antigos
  domain: string;
  quality: string;
  rawDescription: string;
  observedResult: string;
  openQuestions: string;
  enrichmentNotes?: string;
  enrichmentUpdatedAt?: string;
  createdAt: string;
  status: ObservationStatus;
}

export function getDefaultObservationDraft(): ObservationDraft {
  return {
    title: "",
    date: new Date().toISOString().split("T")[0],
    organizationName: "",
    locations: [""],
    domain: "",
    quality: "",
    rawDescription: "",
    observedResult: "",
    openQuestions: "",
    lastSaved: "",
  };
}

export function isDraftWithContent(draft: ObservationDraft): boolean {
  return Boolean(
    draft.title ||
      draft.rawDescription ||
      draft.organizationName ||
      draft.locations.some((l) => l.trim()) ||
      draft.domain ||
      draft.quality ||
      draft.observedResult ||
      draft.openQuestions
  );
}
