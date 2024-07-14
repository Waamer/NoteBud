
"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import CreateNoteForm from  "./create-note-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import { btnIconStyles, btnStyles, outlineBtnStyles } from "@/styles/styles";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function CreateNoteButton() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { toast } = useToast()
 
    return (
        <div className="w-full">
          <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
              <Button className={cn(btnStyles, "w-full sm:w-auto max-w-none")}><Plus className={btnIconStyles} />Create Note</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a Note</DialogTitle>
                <DialogDescription>
                  Create a note that you want to be searchable/editable later on
                </DialogDescription>
              </DialogHeader>
              <CreateNoteForm onNoteCreated={() => {
                setIsOpenDialog(false);
                toast({
                  title: "Note created",
                  description: "Your note has been successfully created",
                })
              }}/>
            </DialogContent>
        </Dialog>
      </div>
  )
}

