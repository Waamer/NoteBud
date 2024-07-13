'use client'

import { ModeToggle } from "@/components/ui/mode-toggle"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import ToggleableNav from "../dashboard/toggleable-nav"
import { LogIn } from "lucide-react"

export default function HeaderActions() {
    return (
        <>
            <Unauthenticated> 
                <ModeToggle />   
                <SignInButton>
                    <Button
                        variant="outline"
                        className="group -ml-0.5 sm:-ml-1 flex hover:gap-1 transition-all duration-400 bg-rose-600/10 hover:bg-rose-600/20 dark:bg-rose-950/80 dark:hover:bg-rose-900/60 border-none scale-90 font-medium"
                    >
                        Sign In
                        <LogIn className="size-0 group-hover:size-5 transition-all duration-400"/>
                    </Button>
                </SignInButton>
            </Unauthenticated>
            <Authenticated>
                <ModeToggle />
                <ToggleableNav />
                <div className="flex items-center h-fit">
                    <UserButton />
                </div>
            </Authenticated>
            <AuthLoading>
                <Skeleton className="h-8 w-8 rounded-md my-1" />
                <Skeleton className="h-8 w-8 rounded-md my-1 sm:hidden" />
                <Skeleton className="h-8 w-[68px] rounded-md my-1" />
            </AuthLoading>
        </>
    )
}