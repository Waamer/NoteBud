'use client'

import CreateNoteButton from "./create-note-button";
import { NotePicker } from "./pick-a-note";


export default function NotesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="space-y-8 w-full">
            <div className="flex justify-between items-center flex-col space-y-3 sm:space-y-0 sm:flex-row">
                <h1 className="text-4xl font-bold">My Notes</h1>
                <div className="flex gap-2 flex-col min-[320px]:flex-row items-center">
                    <NotePicker />
                    <CreateNoteButton />
                </div>
            </div>
            {children}
        </main>
    )
}