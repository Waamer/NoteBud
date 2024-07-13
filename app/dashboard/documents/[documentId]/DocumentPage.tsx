"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteButton } from "./delete-button";
import { useEffect, useState } from "react";

export default function DocumentPage({ params }: { params: { documentId: Id<"documents"> } }) {
    const document = useQuery(api.documents.getDocument, { documentId: params.documentId });
    const [fileContent, setFileContent] = useState<string | null>(null);

    useEffect(() => {
        if (document && document.documentUrl) {
            fetch(document.documentUrl)
                .then(response => response.text())
                .then(text => setFileContent(text))
                .catch(error => console.error("Error fetching document content:", error));
        }
    }, [document]);

    return (
        <main className="w-full space-y-4 sm:space-y-6">

            {/*Doc Skeleton*/}
            {!document && 
                <div className="space-y-4">
                    <div className="flex justify-between items-center flex-col space-y-3 sm:space-y-0 sm:flex-row">
                        <Skeleton className="h-[40px] w-full max-w-[400px]" />
                        <Skeleton className="h-[40px] w-full max-w-[300px] sm:w-[101px]" />
                    </div>
                    <div className="flex gap-2 pt-6">
                        <Skeleton className="h-[35px] w-[90px]" />
                        <Skeleton className="h-[35px] w-[55px]" />
                    </div>    
                    <Skeleton className="h-[500px]" />
                </div>
            }

            {/*Doc*/}
            {document && <>
                <h1 className="text-4xl font-bold">{document.title}</h1>
                <div className="flex gap-12">
                    <Tabs defaultValue="document" className="w-full">
                        <div className="flex gap-2 justify-between">
                            <TabsList className="mb-2">
                                <TabsTrigger value="document">Document</TabsTrigger>
                                <TabsTrigger value="chat">Chat</TabsTrigger>
                            </TabsList>
                            <DeleteButton documentId={document._id} />
                        </div>
                        <TabsContent value="document">
                            <div className="bg-rose-200/60 dark:bg-rose-950/50 rounded-lg p-4 dark:text-rose-50 flex-1 h-[500px]">
                                {fileContent ? (
                                    <p className="whitespace-pre-line">{fileContent}</p>
                                ) : (
                                    <Skeleton className="h-[500px]" />
                                )}
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