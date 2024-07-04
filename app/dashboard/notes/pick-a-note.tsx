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

type Note = {
  label: string;
  link: string;
};

export function NotePicker() {
  const notesQuery = useQuery(api.notes.getNotes);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (notesQuery) {
      const fetchedNotes = notesQuery.map(note => ({ label: note.text.substring(0, 20) + '...', link: '/dashboard/notes/' + note._id }));
      setNotes(fetchedNotes);
      console.log(fetchedNotes)
      console.log(pathname)
      const currentNote = fetchedNotes.find(note => pathname.includes(note.link));
      if (currentNote) {
        setSelectedNote(currentNote);
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
          <StatusList notes={notes} setOpen={setIsOpenPopover} setSelectedNote={setSelectedNote} />
        </PopoverContent>
      </Popover>
    </div>

    <div className="sm:hidden">
    <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
      <DrawerTrigger asChild>
        <Button variant="outline" className={outlineBtnStyles}>
          {selectedNote ? <>{selectedNote.label}</> : <><MousePointerClick strokeWidth={1.75} />Pick a note</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList notes={notes} setOpen={setIsOpenDrawer} setSelectedNote={setSelectedNote} />
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
}: {
  notes: Note[];
  setOpen: (open: boolean) => void
  setSelectedNote: (note: Note | null) => void;
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