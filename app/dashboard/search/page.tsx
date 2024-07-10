'use client'

import { useEffect, useState } from "react";
import { SearchForm } from "./search-form";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { NotebookText, File, Sparkles } from "lucide-react";
import DOMPurify from "dompurify";

function SearchResult({
    url,
    score,
    htmlContent,
    type,
    title
}: {
    url: string,
    score: number,
    htmlContent: string,
    type: string,
    title: string
}) {
    const sanitizedHtml = DOMPurify.sanitize(htmlContent);
    return(
        <Link href={url}>
            <li className="w-full space-y-4 transition-all bg-rose-200/60 dark:bg-rose-950/60 hover:bg-rose-300/60 hover:dark:bg-rose-900/60 rounded-lg p-3 dark:text-rose-50 flex-1 whitespace-pre-line">
                <div className="flex gap-2 items-center flex-col min-[330px]:flex-row justify-between">
                    <div className="flex gap-1 items-center text-xl">
                        {type === 'Note' ? <NotebookText size={21} strokeWidth={1.8} /> : <File size={21} />}
                        {type}
                    </div>
                    <div className="text-sm">Relevancy of {(score * 100).toFixed(0)}%</div>
                </div>
                <div><b className="text-lg font-medium">{title}:</b> <div className="prose dark:prose-dark" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} /></div>
            </li>
        </Link>
    )
}

export default function SearchPage() {

    const [results, setResults] = useState<typeof api.search.searchAction._returnType>(null)


    return (
        <main className="space-y-4 sm:space-y-6 w-full">
            <div className="flex justify-between items-center flex-col space-y-3 sm:space-y-0 sm:flex-row">
                <h1 className="text-4xl font-bold">Search</h1>
            </div>

            <SearchForm setResults={(searchResults) => {
                setResults(searchResults)
            }}/>

            {!results &&
                <div className="w-full space-y-4 transition-all bg-rose-200/60 dark:bg-rose-950/60 hover:bg-rose-300/60 hover:dark:bg-rose-900/60 rounded-lg p-3 dark:text-rose-50 flex-1 whitespace-pre-line">
                    <div className="flex gap-2 items-center flex-col min-[330px]:flex-row justify-between">
                        <div className="flex gap-1.5 items-center text-xl">
                            <Sparkles size={23} strokeWidth={1.8}/>
                            Example
                        </div>
                    </div>
                    <div>This is a example of a search result. You can click real search results to go to their associated notes/documents!</div>
                </div>
            }

            <ul className="flex flex-col gap-4">
            {results?.map((result) => {
                if (result.type === 'notes') {
                    return (<div key={result.record._id}>
                        <SearchResult
                            url={`/dashboard/notes/${result.record._id}`}
                            score={result.score}
                            htmlContent={result.record.text}
                            type="Note"
                            title={result.record.title}
                        /></div>

                            )
                } else {
                    return (<div key={result.record._id}>
                        <SearchResult
                            url={`/dashboard/documents/${result.record._id}`}
                            score={result.score}
                            htmlContent={result.record.description + ''}
                            type="Document"
                            title={result.record.title}
                        /></div>
                            )
                }
            })}
            </ul>

        </main>
    )
}