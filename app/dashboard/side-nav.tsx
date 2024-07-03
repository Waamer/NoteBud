'use client'
import { cn } from "@/lib/utils";
import { Files, NotebookPen, Settings } from "lucide-react";
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
                <li>
                    <Link className={cn(
                        "font-light text-lg sm:text-xl flex gap-1 items-center hover:text-rose-600/80 transition-color duration-200 w-fit",
                        {
                            "text-rose-600": pathname.endsWith('dashboard/settings')
                        },
                    )} href="/dashboard/settings" >
                        <Settings strokeWidth={1.75} />
                        Settings
                    </Link>
                </li>
            </ul>
        </nav>
  )
}
