import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db.query("todos").order("desc").collect();
  },
});

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("todos", {
      text: args.text,
      completed: false,
      createdAt: Date.now(),
    });
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todos"), completed: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { completed: args.completed });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});