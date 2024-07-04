'use client'

import { useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import { NotePicker } from "./pick-a-note";
import { api } from "@/convex/_generated/api";
import Link from "next/link";


export default function NotesPage() {
    return (
        <div className="text-2xl font-bold">Please select a note</div>
    )
}