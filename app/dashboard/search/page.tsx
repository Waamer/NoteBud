'use client'

import { useState } from "react";
import { SearchForm } from "./search-form";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import Link from "next/link";


export default function SearchPage() {

    const [results, setResults] = useState<typeof api.search.searchAction._returnType>(null)

    return (
        <main className="space-y-8 w-full">
            <div className="flex justify-between items-center flex-col space-y-3 sm:space-y-0 sm:flex-row">
                <h1 className="text-4xl font-bold">Search</h1>
            </div>
            <SearchForm setResults={setResults} />

            <ul className="flex flex-col gap-4">
            {results?.map((result) => {
                if (result.type === 'notes') {
                    return (
                                <Link href={`/dashboard/notes/${result.record._id}`} key={result.record._id}>
                                    <li className="w-full transition-all bg-rose-200/60 dark:bg-rose-950/60 hover:bg-rose-300/60 hover:dark:bg-rose-900/60 rounded-lg p-3 dark:text-rose-50 flex-1 whitespace-pre-line">
                                        Type: Note {result.score} {result.record.text.substring(0, 500) + '...'}
                                    </li>
                                </Link>
                            )
                } else {
                    return (
                                <Link href={`/dashboard/documents/${result.record._id}`} key={result.record._id}>
                                    <li className="w-full transition-all bg-rose-200/60 dark:bg-rose-950/60 hover:bg-rose-300/60 hover:dark:bg-rose-900/60 rounded-lg p-3 dark:text-rose-50 flex-1 whitespace-pre-line">
                                        Type: Document {result.score} {result.record.title} {result.record.description}
                                    </li>
                                </Link>
                            )
                }
            })}
            </ul>

        </main>
    )
}