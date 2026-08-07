export const OBSERVATIONS_STORAGE_KEY = "tpc:field-observations:v1";
export const LEGACY_DRAFT_STORAGE_KEY = "tpc-observation-draft";

export type ObservationStatus = "registrada";

export interface ObservationDraft {
  title: string;
  date: string;
  location: string;
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
  location: string;
  domain: string;
  quality: string;
  rawDescription: string;
  observedResult: string;
  openQuestions: string;
  createdAt: string;
  status: ObservationStatus;
}

export function getDefaultObservationDraft(): ObservationDraft {
  return {
    title: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
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
      draft.location ||
      draft.domain ||
      draft.quality ||
      draft.observedResult ||
      draft.openQuestions
  );
}
