'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { OrganizationSwitcher} from "@clerk/nextjs"
import { Authenticated, AuthLoading } from "convex/react"

export function OrgActions() {
    return (
        <>
            <Authenticated>
                <OrganizationSwitcher />
            </Authenticated>
            <AuthLoading>
                <Skeleton className="h-7 w-[183px] rounded-md" />
            </AuthLoading>
        </>
    )
}