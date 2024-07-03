import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";


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