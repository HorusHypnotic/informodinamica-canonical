import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const researchPackages = mysqlTable("research_packages", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 32 }).notNull().unique(), // e.g. RP-001
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 64 }).notNull(), // "Completo" or "Em andamento"
  version: varchar("version", { length: 32 }).notNull(), // e.g. v1.0.0
  githubUrl: varchar("githubUrl", { length: 512 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const observations = mysqlTable("observations", {
  id: int("id").autoincrement().primaryKey(),
  obsId: varchar("obsId", { length: 32 }).notNull().unique(), // e.g. OBS-0001
  domain: varchar("domain", { length: 128 }).notNull(), // e.g. Obras
  theme: varchar("theme", { length: 128 }).notNull(), // e.g. Projeto / Execução
  obsType: varchar("obsType", { length: 16 }).notNull(), // e.g. O2
  status: varchar("status", { length: 64 }).notNull(), // e.g. Revisado
  summary: text("summary").notNull(),
  phenomenon: text("phenomenon").notNull(),
  representations: text("representations").notNull(),
  agents: text("agents").notNull(),
  channels: text("channels").notNull(),
  competingHypotheses: json("competingHypotheses").notNull(), // stored as JSON object or string array
  contradictions: text("contradictions").notNull(),
  openQuestions: text("openQuestions").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const governanceGuidelines = mysqlTable("governance_guidelines", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(), // e.g. Regra dos Três Registros, Camadas, Hipóteses Concorrentes
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
