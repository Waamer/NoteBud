"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentPage({ params }: { params: { documentId: Id<"documents"> } }) {

    const document = useQuery(api.documents.getDocument, { documentId: params.documentId });

    return (
        <main className="p-12 px-10 sm:p-16 md:p-20 xl:px-24 space-y-8">
            {!document && 
                <div className="space-y-4">
                    <div>
                        <Skeleton className="h-[35px] w-full max-w-[400px]" />
                    </div>
                    <div className="flex gap-2 pt-6">
                        <Skeleton className="h-[35px] w-[90px]" />
                        <Skeleton className="h-[35px] w-[55px]" />
                    </div>    
                    <Skeleton className="h-[500px]" />
                </div>
            }

            {document && <>
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">{document.title}</h1>
                </div>
                <div className="flex gap-12">
                    <Tabs defaultValue="document" className="w-full">
                        <TabsList className="mb-2">
                            <TabsTrigger value="document">Document</TabsTrigger>
                            <TabsTrigger value="chat">Chat</TabsTrigger>
                        </TabsList>
                        <TabsContent value="document">
                            <div className="bg-rose-200/60 dark:bg-rose-950/30 rounded-lg p-2 dark:text-rose-50 flex-1 h-[500px]">
                                {document.documentUrl && <iframe className="size-full" src={document.documentUrl}/>}
                            </div>
                        </TabsContent>
                        <TabsContent value="chat">
                            <ChatPanel documentId={document._id}/>
                        </TabsContent>
                    </Tabs>
                </div>
            </>}
        </main>
    );
}
