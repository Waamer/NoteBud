
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
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
  

export default function CreateNoteButton() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const { toast } = useToast()
 
    return (
      <>
        <div className="hidden sm:block">
          <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
              <Button className={btnStyles}><Plus className={btnIconStyles} />Create Note</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a Note</DialogTitle>
                <DialogDescription>
                  Type what ever note you want to be searchable later on
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

      <div className="sm:hidden">
        <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
          <DrawerTrigger asChild>
            <Button className={btnStyles}><Plus className={btnIconStyles} />Create Note</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Create a Note</DrawerTitle>
              <DrawerDescription>
                Type what ever note you want to be searchable later on
              </DrawerDescription>
            </DrawerHeader>
            <CreateNoteForm onNoteCreated={() => {
              setIsOpenDrawer(false);
              toast({
                title: "Note created",
                description: "Your note has been successfully created",
                })
              }}/>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline" className={outlineBtnStyles}>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      </>
  )
}

