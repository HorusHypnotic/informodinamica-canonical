import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, researchPackages, observations, governanceGuidelines } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// TPC Queries & Seeding
export async function seedTpcDataIfNeeded() {
  const db = await getDb();
  if (!db) return;

  try {
    // Seed Research Packages if empty
    const rps = await db.select().from(researchPackages);
    if (rps.length === 0) {
      await db.insert(researchPackages).values([
        {
          code: "RP-001",
          title: "Metodologia para Análise da Persistência da Coordenação",
          description: "Fundação analítica e metodológica da TPC, definindo os protocolos MET-006 a MET-009, as latências informodinâmicas (T0 a T4) e as três classes de entropia coordenativa.",
          status: "Completo",
          version: "v1.0.0",
          githubUrl: "https://github.com/HorusHypnotic/informodinamica-canonical/tree/main/publications/RP-001-methodology"
        },
        {
          code: "RP-002",
          title: "Estudo de Caso em CI/CD: Detectando Falsos Verdes",
          description: "Validação controlada em ambiente de desenvolvimento de software (FastAPI + GitHub Actions), analisando 8 condições experimentais e falsos verdes.",
          status: "Completo",
          version: "v1.0.0",
          githubUrl: "https://github.com/HorusHypnotic/informodinamica-canonical/tree/main/publications/RP-002-case-study-cicd"
        },
        {
          code: "RP-003",
          title: "Revisão da Literatura sobre Coordenação e Representação",
          description: "Posicionamento crítico da TPC frente à Cognição Distribuída (Hutchins), Sensemaking (Weick) e FRAM (Hollnagel), com matriz de convergência teórica.",
          status: "Completo",
          version: "v1.0.0",
          githubUrl: "https://github.com/HorusHypnotic/informodinamica-canonical/tree/main/publications/RP-003-literature-review"
        },
        {
          code: "RP-004",
          title: "Validação Observacional no Canteiro de Obras",
          description: "Protocolo observacional de campo para teste de generalidade da TPC em ambientes híbridos físico-digitais (construção civil e gestão de suprimentos).",
          status: "Em andamento",
          version: "v0.1.0",
          githubUrl: "https://github.com/HorusHypnotic/informodinamica-canonical/tree/main/publications/RP-004-observational-validation"
        }
      ]);
    }

    // Seed Observations if empty
    const obs = await db.select().from(observations);
    if (obs.length === 0) {
      await db.insert(observations).values([
        {
          obsId: "OBS-0001",
          domain: "Construção Civil",
          theme: "Projeto / Execução",
          obsType: "O2",
          status: "Revisado",
          summary: "Conflito de versão entre BIM estrutural e projeto elétrico em papel durante concretagem de laje.",
          phenomenon: "Durante a concretagem da laje do 3º pavilhão, a posição dos conduítes elétricos previstos no projeto revisado (Rev. 03) divergiu da armação de aço já posicionada em campo.",
          representations: "Projeto estrutural digital (BIM Viewer Rev. 03) vs. Projeto elétrico impresso em papel (Rev. 02, desatualizado).",
          agents: "Mestre de obras (Carlos), encarregado de elétrica (João), engenheiro residente.",
          channels: "Papel impresso, tablet com BIM Viewer, aplicativo de mensagens instantâneas (WhatsApp).",
          competingHypotheses: {
            tpc: "Desalinhamento informodinâmico entre representações persistentes (BIM vs. Papel), ampliado por latências de transmissão (T1 - T0).",
            traditional: "Falha de comunicação humana e desatenção do mestre de obras ao não conferir a revisão impressa.",
            bim: "Uso parcial de papel em vez de 100% de dispositivos móveis sincronizados.",
            lean: "Falha no fluxo puxado de informações e ausência de constraint analysis prévia."
          },
          contradictions: "A coexistência de suportes (papel e digital) gera janelas de assimetria que o BIM puro ou o papel puro isoladamente mascaram.",
          openQuestions: "Como medir quantitativamente o impacto da latência T1 - T0 na produtividade diária das equipes de campo?"
        },
        {
          obsId: "OBS-0002",
          domain: "Construção Civil",
          theme: "Suprimentos / Materiais",
          obsType: "O2",
          status: "Revisado",
          summary: "Divergência dimensional em lote de blocos cerâmicos no recebimento de materiais para alvenaria.",
          phenomenon: "Um lote de blocos cerâmicos entregue pelo fornecedor divergiu da especificação dimensional contratada (blocos de 14cm em vez de 19cm), paralisando o início da alvenaria.",
          representations: "Nota fiscal e pedido de compra digital (ERP) vs. Especificação técnica do projeto arquitetônico.",
          agents: "Almoxarife (Pedro), comprador da construtora (Marcos), encarregado de alvenaria (Antônio).",
          channels: "Nota fiscal física/digital, telefone, registro de não-conformidade (RNC).",
          competingHypotheses: {
            tpc: "Falha de acoplamento entre o pedido comercial e a especificação técnica, sem canal de checagem prévia na interface de recebimento.",
            traditional: "Erro do fornecedor e falta de rigor no controle de almoxarifado.",
            bim: "Inexistência de integração entre o quantitativo do modelo BIM e o sistema ERP de compras.",
            lean: "Falha na homologação de fornecedores e ausência de inspeção na fonte."
          },
          contradictions: "O sistema comercial e o sistema técnico operam com representações desconectadas, gerando falha de interface no recebimento.",
          openQuestions: "Como automatizar a verificação prévia de recebimento para minimizar o custo de transação da recusa em campo?"
        }
      ]);
    }

    // Seed Governance Guidelines if empty
    const gov = await db.select().from(governanceGuidelines);
    if (gov.length === 0) {
      await db.insert(governanceGuidelines).values([
        {
          title: "Regra dos Três Registros",
          slug: "regra-dos-tres-registros",
          summary: "Nenhum conceito, métrica ou categoria teórica nova pode ser introduzido na TPC antes de aparecer de forma recorrente em, no mínimo, três observações independentes.",
          content: "Para proteger o programa TPC contra o viés de novidade e a inflação conceitual prematura, estabelece-se a regra metodológica de que a observação precede rigorosamente a explicação. Teorias robustas emergem da repetição de padrões em dados empíricos."
        },
        {
          title: "Camadas",
          slug: "camadas",
          summary: "Separação estrutural em Camada Permanente (METs, Governança), Camada de Pesquisa (Taxonomia, Hipóteses, Experimentos) e Camada de Publicação (Research Packages).",
          content: "A arquitetura do programa blinda o núcleo teórico contra modificações impulsivas, permitindo que a pesquisa empírica evolua de forma autônoma através de Research Packages modulares e rastreáveis."
        },
        {
          title: "Hipóteses Concorrentes",
          slug: "hipoteses-concorrentes",
          summary: "Obrigação metodológica de confrontar a TPC com explicações alternativas (Gestão Tradicional, BIM, Lean) para cada observação de campo.",
          content: "A TPC não busca autoconfirmação, mas sim poder preditivo diferencial. Cada unidade observacional testa explicitamente como paradigmas concorrentes explicam e resolvem o mesmo incidente coordenativo."
        }
      ]);
    }
  } catch (error) {
    console.warn("[Seed] Error seeding TPC data:", error);
  }
}

export async function getAllResearchPackages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(researchPackages);
}

export async function getAllObservations() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(observations);
}

export async function getObservationByObsId(obsId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const res = await db.select().from(observations).where(eq(observations.obsId, obsId)).limit(1);
  return res.length > 0 ? res[0] : undefined;
}

export async function getAllGovernanceGuidelines() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(governanceGuidelines);
}
