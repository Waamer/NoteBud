"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { QuestionForm } from "./question-form";

export default function ChatPanel({ documentId }: { documentId: Id<"documents"> } ) {
    const chats = useQuery(api.chats.getChatsForDocument, { documentId })

    return (
        <div className="bg-rose-200/60 dark:bg-rose-950/30 rounded-lg p-4 flex flex-col">
            <div className="overflow-y-auto min-h-[350px] max-h-[500px] space-y-2.5 py-1">
                <div className="bg-rose-300/35 dark:bg-rose-950/90 rounded-lg p-3 py-2.5">AI: Ask any question using AI about your document</div>
                {chats?.map(chat => (
                    <div key={chat._id} className={cn(
                        {
                            "bg-rose-400/40 dark:bg-rose-900/60 text-right": chat.isHuman,
                            "bg-rose-300/35 dark:bg-rose-950/90": !chat.isHuman
                        }, 
                        "rounded-lg p-3 py-2.5 whitespace-pre-line"
                        )}>
                        {chat.isHuman ? "YOU: " : "AI: "}{chat.text}
                    </div>
                ))}
            </div>
            <div className="flex gap-1">
                <QuestionForm documentId={documentId} />
            </div>
        </div>
    );
}
