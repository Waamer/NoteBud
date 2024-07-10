'use client'

import { cn } from "@/lib/utils"
import { Authenticated } from "convex/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function HeaderDash() {
    const pathname = usePathname()
    return(
    <Authenticated> 
        <Link href="/dashboard/" className={cn(
                        "hidden md:block font-normal text-md hover:text-rose-600/80 transition-color duration-200 w-fit",
                        {
                            "text-rose-600": pathname.endsWith('dashboard/search')
                        },
                    )}>
            <h1 className="text-md select-none">Dashboard</h1>
        </Link>
    </Authenticated>
    )
}