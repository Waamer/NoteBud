
import { Bot } from "lucide-react"
import HeaderActions from "./header-actions"
import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-rose-200/60 dark:bg-rose-950/30 h-16">
            <div className="container mx-0 px-3 sm:mx-auto flex justify-between items-center py-3">
                <div className="flex gap-12 items-center">
                    <Link href="/" className="sm:hover:scale-105 hover:text-rose-600/80 transition-color duration-200 w-fit transition-all flex gap-1 items-center -mt-1">
                        <Bot strokeWidth={1.75} size={28}/>
                        <h1 className="text-2xl mt-0.5 font-semibold select-none">NoteBud</h1>
                    </Link>
                </div>
                <div className="flex gap-1 sm:gap-2 items-center">
                    <HeaderActions />
                </div>
            </div>
        </header>
    )
}