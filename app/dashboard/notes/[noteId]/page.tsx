'use client'

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Pencil, Save, Trash2 } from "lucide-react";
import { btnStyles, outlineBtnStyles } from "@/styles/styles";
import { cn } from "@/lib/utils";
import { DeleteNoteButton } from "./delete-note-button";

export default function NotePage() {
    const {noteId} = useParams<{ noteId: Id<'notes'> }>()
    const note = useQuery(api.notes.getNote, {
        noteId: noteId
    })
    return (
        <div className="space-y-2 w-full bg-rose-200/60 dark:bg-rose-950/50 rounded-lg p-3.5 dark:text-rose-100 flex-1 min-h-[200px] whitespace-pre-line">

        {!note && 
            <div className="space-y-4">
                <div className="flex justify-between items-center flex-col-reverse space-y-1 sm:space-y-0 sm:flex-row">
                    <Skeleton className="h-[40px] w-full max-w-[300px] mt-2 sm:mt-0" />
                    <div className="flex gap-2 flex-col sm:flex-row items-center w-full sm:w-auto">
                        <Skeleton className="h-[40px] w-full sm:w-[80px]" />
                        <Skeleton className="h-[40px] w-full sm:w-[91px]" />
                    </div>
                </div>   
                <Skeleton className="h-[300px]" />
            </div>
        }
        {note && <>
            <div className="flex justify-between items-center flex-col-reverse space-y-1 sm:space-y-0 sm:flex-row ">
                <h1 className="text-2xl font-semibold mt-2 sm:mt-0">{note?.text.substring(0, 20) + '...'}</h1>
                <div className="flex gap-2 flex-col sm:flex-row items-center w-full sm:w-auto">
                    <Button variant="outline" size="icon" className="w-full sm:px-2 group bg-rose-600/15 hover:bg-rose-600/25 dark:bg-rose-900/40 dark:hover:bg-rose-900/60 border-none flex items-center gap-2">
                        <Save strokeWidth={1.75} />
                        Save
                    </Button>
                    <DeleteNoteButton noteId={noteId}/>
                </div>
            </div>
            <h1>{note?.text}</h1>
            </>
        }
        </div>
    )
}