import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { seedTpcDataIfNeeded, getAllResearchPackages, getAllObservations, getObservationByObsId, getAllGovernanceGuidelines } from "./db";
import { z } from "zod";

// Seed data on startup
seedTpcDataIfNeeded().catch(err => console.error("Failed to seed TPC data:", err));

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tpc: router({
    getResearchPackages: publicProcedure.query(async () => {
      return await getAllResearchPackages();
    }),
    getObservations: publicProcedure.query(async () => {
      return await getAllObservations();
    }),
    getObservationByObsId: publicProcedure.input(z.object({ obsId: z.string() })).query(async ({ input }) => {
      return await getObservationByObsId(input.obsId);
    }),
    getGovernanceGuidelines: publicProcedure.query(async () => {
      return await getAllGovernanceGuidelines();
    }),
  }),
});

export type AppRouter = typeof appRouter;
