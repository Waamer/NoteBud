import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getDocuments = query({
    async handler(ctx) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) return [];

        return await ctx.db.query('documents').withIndex(
            'by_tokenIdendtifier', (q) => q.eq('tokenIdentifier', userId)
        ).collect()

    }
})

export const createDocument = mutation({
    args: {
        title: v.string()
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) throw new ConvexError('Not Authenticated')

        await ctx.db.insert('documents', {
            title: args.title,
            tokenIdentifier: userId
        })
    },
})