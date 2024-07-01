"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";

export default function DocumentPage({ params }: { params: { documentId: Id<"documents"> } }) {

    const document = useQuery(api.documents.getDocument, { documentId: params.documentId });

    if (!document) {
        <div>You don`t have access to this document :0 </div>
    } else return (
        <main className="p-12 sm:p-16 md:p-20 xl:p-24 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">{document.title}</h1>
            </div>
            <div className="flex gap-12">
                <div className="bg-rose-200/60 dark:bg-rose-950/30 rounded-lg p-2 dark:text-rose-50 flex-1 h-[600px]">
                    {document.documentUrl && <iframe className="size-full" src={document.documentUrl}/>}
                </div>
                <div className="w-[300px] bg-rose-200/60 dark:bg-rose-950/30 rounded-lg p-2">

                </div>
            </div>
        </main>
    );
}
