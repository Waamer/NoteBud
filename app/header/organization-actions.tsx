'use client'

import { ModeToggle } from "@/components/ui/mode-toggle"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import ToggleableNav from "../dashboard/toggleable-nav"

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