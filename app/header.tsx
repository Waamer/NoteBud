
import { Bot } from "lucide-react"
import HeaderActions from "./header-actions"
import Link from "next/link"
import { OrganizationSwitcher } from "@clerk/nextjs"

export default function Header() {
    return (
        <header className="bg-rose-200/60 dark:bg-rose-950/30 h-16">
            <div className="container mx-0 px-3 sm:mx-auto flex justify-between items-center py-3">
                <div className="flex gap-6 items-center">
                    <Link href="/" className="sm:hover:scale-105 hover:text-rose-600/80 transition-color duration-200 w-fit transition-all flex gap-1 items-center">
                        <div className="-mt-1"><Bot strokeWidth={1.75} size={28}/></div>
                        <h1 className="text-2xl font-semibold select-none">NoteBud</h1>
                    </Link>
                    <div className="hidden sm:block w-fit pt-[1px] bg-rose-600/10 hover:bg-rose-600/20 dark:bg-rose-950/80 dark:hover:bg-rose-900/60 rounded-md">
                        <OrganizationSwitcher />
                    </div>
                </div>
                <div className="flex gap-1 sm:gap-2 items-center">
                    <HeaderActions />
                </div>
            </div>
            <div className="sm:hidden w-fit bg-rose-200/60 dark:bg-rose-950/30 border-t border-rose-200 dark:border-rose-950/50 rounded-bl-lg absolute right-0">
                <OrganizationSwitcher />
            </div>
        </header>
    )
}