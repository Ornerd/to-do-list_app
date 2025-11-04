import { query } from "./_generated/server";

export const testQuery = query({
  handler: async (ctx) => {
    return { message: "Convex is working!", timestamp: Date.now() };
  },
});