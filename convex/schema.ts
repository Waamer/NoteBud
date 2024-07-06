import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({ 
    title: v.string(),
    tokenIdentifier: v.string(),
    description: v.optional(v.string()),
    fileId: v.id("_storage"),
    embedding: v.optional(v.array(v.float64())),
  }).index('by_tokenIdendtifier', ['tokenIdentifier'])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier"],
    }),
  chats: defineTable({ 
    documentId: v.id("documents"),
    isHuman: v.boolean(),
    tokenIdentifier: v.string(),
    text: v.string(),
  }).index('by_documentId_tokenIdendtifier', ['documentId', 'tokenIdentifier']),
  notes: defineTable({
    text: v.string(),
    tokenIdentifier: v.string(),
    embedding: v.optional(v.array(v.float64())),
  }).index('by_tokenIdendtifier', ['tokenIdentifier'])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier"],
    }),
});