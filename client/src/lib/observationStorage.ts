import {
  getDefaultObservationDraft,
  LEGACY_DRAFT_STORAGE_KEY,
  OBSERVATIONS_STORAGE_KEY,
  ORGANIZATIONS_STORAGE_KEY,
  BACKUP_STORAGE_PREFIX,
  type LocalObservation,
  type ObservationDraft,
  type Organization,
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
  const defaultDraft = getDefaultObservationDraft();
  let rawLocs = value.locations;
  if (!Array.isArray(rawLocs) || rawLocs.length === 0) {
    if (typeof (value as any).location === "string" && (value as any).location.trim()) {
      rawLocs = [(value as any).location];
    } else {
      rawLocs = defaultDraft.locations;
    }
  }
  return {
    ...defaultDraft,
    ...value,
    title: typeof value.title === "string" ? value.title : "",
    date: typeof value.date === "string" ? value.date : defaultDraft.date,
    organizationName: typeof value.organizationName === "string" ? value.organizationName : "",
    locations: rawLocs.map((l) => (typeof l === "string" ? l : "")),
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

// Organizações
export function loadOrganizations(): Organization[] {
  const stored = readJson<unknown>(ORGANIZATIONS_STORAGE_KEY);
  if (!Array.isArray(stored)) {
    const obs = loadObservations();
    const orgNames = Array.from(new Set(obs.map((o) => o.organizationName).filter(Boolean))) as string[];
    const defaultOrgs: Organization[] = orgNames.map((name, i) => ({
      id: `ORG-${String(i + 1).padStart(3, "0")}`,
      name,
      createdAt: new Date().toISOString(),
    }));
    writeJson(ORGANIZATIONS_STORAGE_KEY, defaultOrgs);
    return defaultOrgs;
  }
  return stored.filter((item): item is Organization => {
    return item && typeof item === "object" && typeof (item as any).id === "string" && typeof (item as any).name === "string";
  });
}

export function saveOrganizations(orgs: Organization[]): boolean {
  return writeJson(ORGANIZATIONS_STORAGE_KEY, orgs);
}

export function getOrCreateOrganization(name: string): Organization {
  const trimmed = name.trim();
  const orgs = loadOrganizations();
  const existing = orgs.find((o) => o.name.toLowerCase() === trimmed.toLowerCase());
  if (existing) return existing;

  const newOrg: Organization = {
    id: `ORG-${String(orgs.length + 1).padStart(3, "0")}`,
    name: trimmed,
    createdAt: new Date().toISOString(),
  };
  saveOrganizations([...orgs, newOrg]);
  return newOrg;
}

// Backup Persistente
export function createPersistentBackup(): string {
  const observations = loadObservations();
  const organizations = loadOrganizations();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupKey = `${BACKUP_STORAGE_PREFIX}${timestamp}`;
  const backupPayload = {
    backupAt: new Date().toISOString(),
    organizations,
    observations,
  };
  writeJson(backupKey, backupPayload);
  return backupKey;
}

export function listPersistentBackups(): { key: string; backupAt: string; count: number }[] {
  const backups: { key: string; backupAt: string; count: number }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(BACKUP_STORAGE_PREFIX)) {
      const data = readJson<any>(key);
      if (data) {
        backups.push({
          key,
          backupAt: data.backupAt || key.replace(BACKUP_STORAGE_PREFIX, ""),
          count: Array.isArray(data.observations) ? data.observations.length : 0,
        });
      }
    }
  }
  return backups.sort((a, b) => b.backupAt.localeCompare(a.backupAt));
}

export function restorePersistentBackup(backupKey: string): boolean {
  const data = readJson<any>(backupKey);
  if (!data || !Array.isArray(data.observations)) return false;
  saveObservations(data.observations);
  if (Array.isArray(data.organizations)) {
    saveOrganizations(data.organizations);
  }
  return true;
}

// Observações
export function loadObservations(): LocalObservation[] {
  const stored = readJson<unknown>(OBSERVATIONS_STORAGE_KEY);
  if (!Array.isArray(stored)) {
    const legacyStored = readJson<unknown>("tpc-observations-corpus");
    if (Array.isArray(legacyStored)) {
      const migrated = legacyStored
        .map((item: any) => normalizeObservation(item))
        .filter((item): item is LocalObservation => Boolean(item && item.id));
      writeJson(OBSERVATIONS_STORAGE_KEY, migrated);
      return migrated;
    }
    return [];
  }
  return stored
    .map((item) => normalizeObservation(item))
    .filter((item): item is LocalObservation => Boolean(item && item.id));
}

function normalizeObservation(item: any): LocalObservation | null {
  if (!item || typeof item !== "object") return null;
  let locs = item.locations;
  if (!Array.isArray(locs) || locs.length === 0) {
    if (typeof item.location === "string" && item.location.trim()) {
      locs = [item.location];
    } else {
      locs = ["Local não especificado"];
    }
  }

  // Migração de enrichmentNotes legado para analysisNotes / hypotheses se necessário
  let analysis = typeof item.analysisNotes === "string" ? item.analysisNotes : "";
  let hyp = typeof item.hypotheses === "string" ? item.hypotheses : "";
  if (!analysis && !hyp && typeof item.enrichmentNotes === "string" && item.enrichmentNotes.trim()) {
    analysis = item.enrichmentNotes;
  }

  const hasEnrichment = Boolean(analysis.trim() || hyp.trim());

  return {
    id: String(item.id || "OBS-LOCAL-0001"),
    title: String(item.title || "Observação sem título"),
    eventDate: String(item.eventDate || new Date().toISOString().split("T")[0]),
    organizationName: typeof item.organizationName === "string" ? item.organizationName : undefined,
    locations: locs.map((l: any) => String(l || "")).filter(Boolean),
    location: item.location,
    domain: String(item.domain || ""),
    quality: String(item.quality || ""),
    rawDescription: String(item.rawDescription || ""),
    observedResult: String(item.observedResult || ""),
    openQuestions: String(item.openQuestions || ""),
    analysisNotes: analysis,
    hypotheses: hyp,
    enrichmentNotes: item.enrichmentNotes,
    enrichmentUpdatedAt: typeof item.enrichmentUpdatedAt === "string" ? item.enrichmentUpdatedAt : undefined,
    createdAt: String(item.createdAt || new Date().toISOString()),
    status: item.status === "enriquecida" || hasEnrichment ? "enriquecida" : "registrada",
  };
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
  const validLocations = draft.locations.map((l) => l.trim()).filter(Boolean);
  if (draft.organizationName.trim()) {
    getOrCreateOrganization(draft.organizationName);
  }

  const observation: LocalObservation = {
    id: getNextObservationId(observations),
    title: draft.title.trim() || "Observação sem título",
    eventDate: draft.date,
    organizationName: draft.organizationName.trim() || undefined,
    locations: validLocations.length > 0 ? validLocations : ["Local não especificado"],
    domain: draft.domain,
    quality: draft.quality,
    rawDescription: draft.rawDescription,
    observedResult: draft.observedResult,
    openQuestions: draft.openQuestions,
    analysisNotes: "",
    hypotheses: "",
    createdAt: new Date().toISOString(),
    status: "registrada",
  };

  return saveObservations([...observations, observation]) ? observation : null;
}

export function findObservation(id: string): LocalObservation | null {
  return loadObservations().find((observation) => observation.id === id) ?? null;
}

export function updateObservationEnrichment(
  id: string,
  analysisNotes: string,
  hypotheses: string
): LocalObservation | null {
  const observations = loadObservations();
  const index = observations.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const trimmedAnalysis = analysisNotes.trim();
  const trimmedHyp = hypotheses.trim();
  const hasContent = Boolean(trimmedAnalysis || trimmedHyp);

  const updated: LocalObservation = {
    ...observations[index],
    analysisNotes: trimmedAnalysis,
    hypotheses: trimmedHyp,
    enrichmentUpdatedAt: new Date().toISOString(),
    status: hasContent ? "enriquecida" : "registrada",
  };

  observations[index] = updated;
  return saveObservations(observations) ? updated : null;
}

// Exportação e Importação
export function exportCorpusJson(): string {
  const observations = loadObservations();
  const organizations = loadOrganizations();
  const corpus = {
    version: "2.0",
    exportedAt: new Date().toISOString(),
    organizations,
    observations,
  };
  return JSON.stringify(corpus, null, 2);
}

export function exportCorpusCsv(): string {
  const observations = loadObservations();
  const headers = [
    "ID",
    "Título",
    "Data do Evento",
    "Organização",
    "Locais",
    "Domínio",
    "Qualidade",
    "Status",
    "Criado em",
    "Notas Analíticas",
    "Hipóteses",
    "Descrição Bruta",
    "Resultado Observado",
    "Questões Abertas",
  ];

  const rows = observations.map((o) => [
    o.id,
    `"${(o.title || "").replace(/"/g, '""')}"`,
    o.eventDate,
    `"${(o.organizationName || "").replace(/"/g, '""')}"`,
    `"${(o.locations || []).join("; ").replace(/"/g, '""')}"`,
    `"${(o.domain || "").replace(/"/g, '""')}"`,
    `"${(o.quality || "").replace(/"/g, '""')}"`,
    o.status,
    o.createdAt,
    `"${(o.analysisNotes || "").replace(/"/g, '""')}"`,
    `"${(o.hypotheses || "").replace(/"/g, '""')}"`,
    `"${(o.rawDescription || "").replace(/"/g, '""')}"`,
    `"${(o.observedResult || "").replace(/"/g, '""')}"`,
    `"${(o.openQuestions || "").replace(/"/g, '""')}"`,
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export type ConflictStrategy = "skip" | "overwrite" | "keep_both";

export function importCorpusJson(
  jsonText: string,
  strategy: ConflictStrategy = "skip"
): { importedCount: number; skippedCount: number; backupKey: string; error?: string } {
  try {
    const parsed = JSON.parse(jsonText);
    const incomingObs: any[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.observations)
      ? parsed?.observations
      : [];
    if (incomingObs.length === 0) {
      return { importedCount: 0, skippedCount: 0, backupKey: "", error: "Nenhuma observação válida encontrada no arquivo JSON." };
    }

    // Criar backup persistente ANTES de qualquer alteração destrutiva
    const backupKey = createPersistentBackup();

    const currentObs = loadObservations();
    const currentMap = new Map(currentObs.map((o) => [o.id, o]));
    let importedCount = 0;
    let skippedCount = 0;
    let updatedList = [...currentObs];

    for (const raw of incomingObs) {
      const normalized = normalizeObservation(raw);
      if (!normalized) continue;

      if (currentMap.has(normalized.id)) {
        if (strategy === "skip") {
          skippedCount++;
        } else if (strategy === "overwrite") {
          const idx = updatedList.findIndex((o) => o.id === normalized.id);
          if (idx !== -1) {
            updatedList[idx] = normalized;
            importedCount++;
          }
        } else if (strategy === "keep_both") {
          const newId = getNextObservationId(updatedList);
          const cloned = { ...normalized, id: newId };
          updatedList.push(cloned);
          importedCount++;
        }
      } else {
        updatedList.push(normalized);
        importedCount++;
      }
    }

    saveObservations(updatedList);
    return { importedCount, skippedCount, backupKey };
  } catch (err: any) {
    return { importedCount: 0, skippedCount: 0, backupKey: "", error: err?.message || "Erro ao processar JSON." };
  }
}
