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
import { btnIconStyles, btnStyles } from "@/styles/styles";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
  

export default function CreateNoteButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>    
            <Button className={cn(btnStyles, "px-3")}>
                <Plus className={btnIconStyles} />
                Create Note
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a Note</DialogTitle>
                <DialogDescription>
                   Type what ever note you want to be searchable later on
                </DialogDescription>
                
                <CreateNoteForm onNoteCreated={() => {
                  setIsOpen(false);
                  toast({
                    title: "Note created",
                    description: "Your note has been successfully created",
                  })
                }} />

            </DialogHeader>
        </DialogContent>
    </Dialog>
  );
}
