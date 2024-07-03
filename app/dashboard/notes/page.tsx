import CreateNoteButton from "./create-note-button";


export default function NotesPage() {
    return (
        <main className="space-y-8 w-full">
            <div className="flex justify-between items-center flex-col space-y-3 sm:space-y-0 sm:flex-row">
                <h1 className="text-4xl font-bold">My Notes</h1>
                <CreateNoteButton />
            </div>
        </main>
    )
}