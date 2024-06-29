
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Bot } from "lucide-react"
import HeaderActions from "./header-actions"

export default function Header() {
    return (
        <header className="bg-rose-200/60 dark:bg-rose-950/30 h-16">
            <div className="container mx-auto flex justify-between items-center py-3">
                <div className="flex gap-1.5 items-center -mt-1">
                    <Bot size={28}/>
                    <h1 className="text-xl mt-1 font-semibold select-none">NoteBud</h1>
                </div>
                <div className="flex gap-3 items-center">
                    <HeaderActions />
                </div>
            </div>
        </header>
    )
}