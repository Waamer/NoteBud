'use client'

import Image from "next/image";

export default function NotesPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-2 pt-8">
            <Image
              src="/NoNotes.svg"
              width="300"
              height="300"
              alt="Hi"
            />
            <h2 className="text-nowrap text-sm sm:text-2xl mb-2">Select a note or make a new one!</h2>
          </div>
    )
}