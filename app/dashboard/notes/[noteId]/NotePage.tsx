'use client'

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { DeleteNoteButton } from "./delete-note-button";
import Tiptap from "@/components/text-editor/Tiptap";
import { useState } from "react";
import { useMutation } from "convex/react"

export default function NotePage() {
    const {noteId} = useParams<{ noteId: Id<'notes'> }>()
    const note = useQuery(api.notes.getNote, {
        noteId: noteId
    })
    const [anyChanges, setAnyChanges] = useState(true)
    const [noteContent, setNoteContent] = useState(note?.text || "");
    const updateNote = useMutation(api.notes.updateNote);

    async function handleSave() {
        await updateNote({ noteId: noteId, text: noteContent });
        setAnyChanges(true);
    }

    return (
        <div className="space-y-2 w-full bg-rose-200/60 dark:bg-rose-950/50 rounded-lg p-3.5 dark:text-rose-100 flex-1 min-h-[200px] whitespace-pre-line">

        {/*Note Skeleton*/}
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

        {/*Note*/}
        {note &&
            <>
                <div className="flex justify-between items-center flex-col-reverse space-y-1 sm:space-y-0 sm:flex-row ">
                    <h1 className="text-2xl font-semibold mt-2 sm:mt-0">{note?.title}</h1>
                    <div className="flex gap-2 flex-col sm:flex-row items-center w-full sm:w-auto">
                        <Button disabled={anyChanges} onClick={handleSave} variant="outline" size="icon" className="w-full sm:px-2 group bg-rose-600/15 hover:bg-rose-600/25 dark:bg-rose-900/40 dark:hover:bg-rose-900/60 border-none flex items-center gap-2">
                            <Save strokeWidth={1.75} />
                            Save
                        </Button>
                        <DeleteNoteButton noteId={noteId}/>
                    </div>
                </div>
                <Tiptap text={note.text} onChange={(content: string) => {
                    setAnyChanges(content === note.text);
                    setNoteContent(content);
                }} />
            </>
        }

        </div>
    )
}