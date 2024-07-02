import { api, internal } from './_generated/api';
import { Id } from './_generated/dataModel';
import { MutationCtx, QueryCtx, action, internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});


export async function hasAccessToDoc(ctx: MutationCtx | QueryCtx, documentId: Id<"documents">){
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    if (!userId) return null;

    const document = await ctx.db.get(documentId)
    if (!document) return null;
    if (document?.tokenIdentifier !== userId) return null;
    return {document, userId}
}

export const hasAccessToDocQuery = internalQuery({
    args: {
        documentId: v.id("documents")
    },
    async handler(ctx, args) {
        return await hasAccessToDoc(ctx, args.documentId)
    }
})


export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});


export const getDocuments = query({
    async handler(ctx) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) return undefined;

        return await ctx.db.query('documents').withIndex(
            'by_tokenIdendtifier', (q) => q.eq('tokenIdentifier', userId)
        ).collect()
    }
})


export const getDocument = query({
    args: {
        documentId: v.id("documents"),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToDoc(ctx, args.documentId)

        if (!accessObj) return null;

        return {...accessObj.document, documentUrl: await ctx.storage.getUrl(accessObj.document.fileId)}
    }
})


export const createDocument = mutation({
    args: {
        title: v.string(),
        fileId: v.id("_storage"),
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        if (!userId) throw new ConvexError('Not Authenticated')

        const documentId = await ctx.db.insert('documents', {
            title: args.title,
            description: "",
            tokenIdentifier: userId,
            fileId: args.fileId,
        })
        await ctx.scheduler.runAfter(0, internal.documents.generateDocDescription,
            {
                fileId: args.fileId,
                documentId,
            }
        )
    },
})


export const askQuestion = action({
    args: {
        question: v.string(),
        documentId: v.id("documents"),
    },
    async handler(ctx, args) {
        const accessObj = await ctx.runQuery(internal.documents.hasAccessToDocQuery, {
            documentId: args.documentId
        })

        
        if (!accessObj) throw new ConvexError("You do not have access to this document")
            
        const file = await ctx.storage.get(accessObj.document.fileId)
        if (!file) throw new ConvexError("File not found!")

        const text = await file.text();

        const chatCompletion: OpenAI.Chat.Completions.ChatCompletion
         = await openai.chat.completions.create({
            messages: [
                { 
                    role: 'system',
                    content: `Here is the text file: ${text}` 
                },
                {
                    role: 'user',
                    content: `Answer this question: ${args.question}`
                }
            ],
            model: 'gpt-3.5-turbo',
        });

        await ctx.runMutation(internal.chats.createChatRecord, {
            documentId: args.documentId,
            text: args.question,
            isHuman: true,
            tokenIdentifier: accessObj.userId,
        })

        const response = chatCompletion.choices[0].message.content ?? "Could not generate response :<"

        await ctx.runMutation(internal.chats.createChatRecord, {
            documentId: args.documentId,
            text: response,
            isHuman: false,
            tokenIdentifier: accessObj.userId,
        })

        return response
    }
})

export const generateDocDescription = internalAction({
    args: {
        fileId: v.id("_storage"),
        documentId: v.id("documents"),
    },
    async handler(ctx, args) {
        const file = await ctx.storage.get(args.fileId)
        if (!file) throw new ConvexError("File not found!")

        const text = await file.text();

        const chatCompletion: OpenAI.Chat.Completions.ChatCompletion
         = await openai.chat.completions.create({
            messages: [
                { 
                    role: 'system',
                    content: `Here is the text file: ${text}` 
                },
                {
                    role: 'user',
                    content: `Generate a small simple 1 sentence description for this document`
                }
            ],
            model: 'gpt-3.5-turbo',
        });

        const response = chatCompletion.choices[0].message.content ?? "Couldn't figure out the description for this document"

        await ctx.runMutation(internal.documents.updateDocumentDescription, {
            documentId: args.documentId,
            description: response,
        })

        return response
    }
})

export const updateDocumentDescription = internalMutation({
    args: {
        documentId: v.id("documents"),
        description: v.string(),
    },
    async handler(ctx, args) {
        await ctx.db.patch(args.documentId, {
            description: args.description,
        })
    },
})

export const deleteDocument = mutation({
    args: {
        documentId: v.id("documents"),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToDoc(ctx, args.documentId)

        if (!accessObj) throw new ConvexError('You do not have access to this document')
        
        await ctx.storage.delete(accessObj.document.fileId)
        await ctx.db.delete(args.documentId)
    }
})