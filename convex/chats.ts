import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";


export const getChatsForDocument = query({
    args: {
        documentId: v.id("documents"),
        orgId: v.optional(v.string()),
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) return []

        if (args.orgId) {
            return await ctx.db.query("chats").withIndex("by_documentId_orgId",(q) =>
                q
                    .eq("documentId", args.documentId)
                    .eq("orgId", args.orgId)
            ).collect()
        } else {
            return await ctx.db.query("chats").withIndex("by_documentId_tokenIdentifier",(q) =>
                q
                    .eq("documentId", args.documentId)
                    .eq("tokenIdentifier", userId)
            ).collect()
        }

    }
})

export const createChatRecord = internalMutation({
    args: {
        documentId: v.id("documents"),
        isHuman: v.boolean(),
        text: v.string(),
        tokenIdentifier: v.optional(v.string()),
        orgId: v.optional(v.string()),
    },
    async handler(ctx, args) {
        if (args.orgId) {
            await ctx.db.insert('chats', {
                documentId: args.documentId,
                isHuman: args.isHuman,
                text: args.text,
                orgId: args.orgId,
            })
        } else {
            await ctx.db.insert('chats', {
                documentId: args.documentId,
                isHuman: args.isHuman,
                text: args.text,
                tokenIdentifier: args.tokenIdentifier
            })
        }


    }
})