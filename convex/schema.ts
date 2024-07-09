import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  memberships: defineTable({
    orgId: v.string(),
    userId: v.string(),
  }).index('by_orgId_userId', ['orgId', 'userId']),

  documents: defineTable({ 
    title: v.string(),
    tokenIdentifier: v.optional(v.string()),
    orgId: v.optional(v.string()),
    description: v.optional(v.string()),
    fileId: v.id("_storage"),
    embedding: v.optional(v.array(v.float64())),
  }).index('by_tokenIdentifier', ['tokenIdentifier'])
    .index('by_orgId', ['orgId'])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier", 'orgId'],
    }),

  chats: defineTable({ 
    documentId: v.id("documents"),
    isHuman: v.boolean(),
    tokenIdentifier: v.string(),
    text: v.string(),
  }).index('by_documentId_tokenIdentifier', ['documentId', 'tokenIdentifier']),

  notes: defineTable({
    title: v.string(),
    text: v.string(),
    tokenIdentifier: v.optional(v.string()),
    orgId: v.optional(v.string()),
    embedding: v.optional(v.array(v.float64())),
  }).index('by_tokenIdentifier', ['tokenIdentifier'])
    .index('by_orgId', ['orgId'])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tokenIdentifier", 'orgId'],
    }),
});