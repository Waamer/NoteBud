"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { outlineBtnStyles } from "@/styles/styles"
import { MousePointerClick } from "lucide-react"
import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useOrganization } from "@clerk/nextjs"

type Note = {
  label: string;
  link: string;
};

export function NotePicker() {
  const organization = useOrganization()
  const notesQuery = useQuery(api.notes.getNotes, { orgId: organization.organization?.id });
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (notesQuery) {
      const fetchedNotes = notesQuery.map(note => ({ label: note.text.substring(0, 20) + '...', link: '/dashboard/notes/' + note._id }));
      setNotes(fetchedNotes);
      const currentNote = fetchedNotes.find(note => pathname.includes(note.link));
      if (currentNote) {
        setSelectedNote(currentNote);
      } else {
        setSelectedNote(null)
      }
    }
  }, [notesQuery, pathname]);

    return (
    <>
    <div className="hidden sm:block">
      <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
        <PopoverTrigger asChild>
          <Button variant="outline" className={outlineBtnStyles}>
            {selectedNote ? <>{selectedNote.label}</> : <><MousePointerClick strokeWidth={1.75} />Pick a note</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList notes={notes} setOpen={setIsOpenPopover} setSelectedNote={setSelectedNote} selectedNote={selectedNote}/>
        </PopoverContent>
      </Popover>
    </div>

    <div className="sm:hidden w-full">
    <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
      <DrawerTrigger asChild className="w-full">
        <Button variant="outline" className={outlineBtnStyles}>
          {selectedNote ? <>{selectedNote.label}</> : <><MousePointerClick strokeWidth={1.75} />Pick a note</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList notes={notes} setOpen={setIsOpenDrawer} setSelectedNote={setSelectedNote} selectedNote={selectedNote} />
        </div>
      </DrawerContent>
    </Drawer>
    </div>
    </>
  )
}

function StatusList({
  notes,
  setOpen,
  setSelectedNote,
  selectedNote,
}: {
  notes: Note[];
  setOpen: (open: boolean) => void
  setSelectedNote: (note: Note | null) => void;
  selectedNote: Note | null
}) {
  return (
    <Command>
      <CommandInput placeholder="Search notes" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {notes.map((note) => (
            <Link key={note.link} href={note.link}>
            <CommandItem
              value={note.label}
              className={cn({
                "bg-accent text-accent-foreground": selectedNote === note
                }, "hover:bg-accent hover:text-accent-foreground"
              )}
              onSelect={(label) => {
                setSelectedNote(
                  notes.find((priority) => priority.label === label) || null
                )
                setOpen(false)
              }}
            >
                {note.label}
            </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
