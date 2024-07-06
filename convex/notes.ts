import { ConvexError, v } from "convex/values";
import { internalAction, internalMutation, mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import OpenAI from 'openai';
import { internal } from './_generated/api';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export async function embed(text: string) {
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text
    })
    return embedding.data[0].embedding
}

export const setNoteEmbedding = internalMutation({
    args: {
        noteId: v.id('notes'),
        embedding: v.array(v.number()),
    },
    async handler(ctx, args) {
        await ctx.db.patch(args.noteId, {
            embedding: args.embedding
        })
    }
})

export const createNoteEmbedding = internalAction({
    args: {
        noteId: v.id('notes'),
        text: v.string(),
    },
    async handler(ctx, args) {
        const embedding = await embed(args.text);

        await ctx.runMutation(internal.notes.setNoteEmbedding, {
            noteId: args.noteId,
            embedding
        })
    }
})

export const createNote = mutation({
    args: {
        text: v.string(),
    },
    async handler(ctx, args) {
        
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) throw new ConvexError('Unauthorized, must be logged in to sign in')

        const noteId = await ctx.db.insert('notes', {
            text: args.text,
            tokenIdentifier: userId,
        })

        await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
            noteId,
            text: args.text,
        })
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

export async function hasAccessToNote(ctx: MutationCtx | QueryCtx, noteId: Id<"notes">){
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    if (!userId) return null;

    const note = await ctx.db.get(noteId)
    if (!note) return null;
    if (note?.tokenIdentifier !== userId) return null;
    return {note, userId}
}

export const deleteNote = mutation({
    args: {
        noteId: v.id('notes'),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToNote(ctx, args.noteId)

        if (!accessObj) throw new ConvexError('You do not have access to this note')

        await ctx.db.delete(args.noteId)
    }
})

export const updateNote = mutation({
    args: {
        noteId: v.id("notes"),
        text: v.string(),
    },
    async handler(ctx, args) {
        await ctx.db.patch(args.noteId, {
            text: args.text,
        })
    },
})