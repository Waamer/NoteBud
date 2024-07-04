import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createNote = mutation({
    args: {
        text: v.string(),
    },
    async handler(ctx, args) {
        
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) throw new ConvexError('Unauthorized, must be logged in to sign in')

        const note = await ctx.db.insert('notes', {
            text: args.text,
            tokenIdentifier: userId,
        })

        return note
    }
})

export const getNotes = query({
    async handler(ctx) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) return undefined;

        const notes = await ctx.db.query('notes').withIndex(
            'by_tokenIdendtifier', (q) => q.eq('tokenIdentifier', userId)
        ).collect()

        return notes
    }
})

export const getNote = query({
    args: {
        noteId: v.id('notes'),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) return undefined;

        const note = await ctx.db.get(args.noteId)

        if (!note) return null
        if (note.tokenIdentifier !== userId) return null

        return note
    }
})