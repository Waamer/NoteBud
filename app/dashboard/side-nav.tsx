'use client'
import { cn } from "@/lib/utils";
import { Files, FileSearch, NotebookPen, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
    const pathname = usePathname()
    return (
        <nav>
            <ul className="space-y-5">
                <li>
                    <Link className={cn(
                        "font-light text-lg sm:text-xl flex gap-1 items-center hover:text-rose-600/80 transition-color duration-200 w-fit",
                        {
                            "text-rose-600": pathname.endsWith('dashboard/search')
                        },
                    )}
                    href="/dashboard/search" >
                    <FileSearch strokeWidth={1.75} />
                        Search
                    </Link>
                </li>
                <li>
                    <Link className={cn(
                        "font-light text-lg sm:text-xl flex gap-1 items-center hover:text-rose-600/80 transition-color duration-200 w-fit",
                        {
                            "text-rose-600": pathname.endsWith('dashboard/documents')
                        },
                    )}
                    href="/dashboard/documents" >
                    <Files strokeWidth={1.75} />
                        Documents
                    </Link>
                </li>
                <li>
                    <Link className={cn(
                        "font-light text-lg sm:text-xl flex gap-1 items-center hover:text-rose-600/80 transition-color duration-200 w-fit",
                        {
                            "text-rose-600": pathname.endsWith('dashboard/notes')
                        },
                    )} href="/dashboard/notes" >
                        <NotebookPen strokeWidth={1.75} />
                        Notes
                    </Link>
                </li>
            </ul>
        </nav>
  )
}
