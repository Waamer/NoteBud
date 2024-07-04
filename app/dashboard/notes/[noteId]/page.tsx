'use client'

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotePage() {
    const {noteId} = useParams<{ noteId: Id<'notes'> }>()
    const note = useQuery(api.notes.getNote, {
        noteId: noteId
    })
    return (
        <div className="space-y-8 w-full bg-rose-200/60 dark:bg-rose-950/50 rounded-lg p-3.5 dark:text-rose-100 flex-1 min-h-[200px] whitespace-pre-line">

        {!note && 
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

            {note?.text}
        </div>
    )
}