'use client'

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export default function NotePage() {
    const {noteId} = useParams<{ noteId: Id<'notes'> }>()
    const note = useQuery(api.notes.getNote, {
        noteId: noteId
    })
    return (
        <main className="space-y-8 w-full">
            <div>{note?.text}</div>
        </main>
    )
}