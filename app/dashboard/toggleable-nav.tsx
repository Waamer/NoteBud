'use client'
import { cn } from "@/lib/utils";
import { Bot, Files, FileSearch, Menu, NotebookPen, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"; // Adjust the import path according to your project structure
import { Button } from "@/components/ui/button";

export default function ToggleableNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        className="px-2 bg-rose-600/10 hover:bg-rose-600/20 dark:bg-rose-950/80 dark:hover:bg-rose-900/60 border-none scale-90 font-semibold md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu strokeWidth={1.75} size={30}/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav>
                        <ul className="space-y-5">
                            <li>
                                <Link href="/" onClick={() => setIsOpen(!isOpen)} className="transition-all flex gap-1 pb-2 items-center w-fit hover:text-rose-600/80 transition-color duration-200">
                                    <Bot strokeWidth={1.75} size={28}/>
                                    <h1 className="text-2xl mt-0.5 font-semibold select-none">NoteBud</h1>
                                </Link>
                            </li>
                            <li>
                                <Link className={cn(
                                    "font-light text-lg sm:text-xl flex gap-1 items-center hover:text-rose-600/80 transition-color duration-200 w-fit",
                                    {
                                        "text-rose-600": pathname.endsWith('dashboard/search')
                                    },
                                )} onClick={() => setIsOpen(!isOpen)}
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
                                )} onClick={() => setIsOpen(!isOpen)}
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
                                )} onClick={() => setIsOpen(!isOpen)}
                                href="/dashboard/notes" >
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
                                )} onClick={() => setIsOpen(!isOpen)}
                                href="/dashboard/settings" >
                                    <Settings strokeWidth={1.75} />
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}
