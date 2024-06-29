"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="bg-rose-600/10 hover:bg-rose-600/20 dark:bg-rose-950/80 dark:hover:bg-rose-900/60 border-none transition-all hover:scale-95 scale-90">
      {theme === "dark" ? (
        <Sun className="h-[1.4rem] w-[1.4rem] transition-all text-rose-500" />
      ) : (
        <Moon className="h-[1.4rem] w-[1.4rem] transition-all text-rose-500/80" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
