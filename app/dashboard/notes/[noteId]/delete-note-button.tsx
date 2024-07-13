"use client"

import { LoadingButton } from "@/components/loading-button"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { outlineBtnStyles } from "@/styles/styles"
import { useMutation } from "convex/react"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DeleteNoteButton({ noteId }: { noteId: Id<"notes"> }) {
    
    const [isLoading, setIsLoading] = useState(false)
    const deleteNote = useMutation(api.notes.deleteNote)
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const router = useRouter()

    return (
    <>
    <div className="hidden sm:block">
        <AlertDialog open={isOpenDialog} onOpenChange={(open) => {setIsOpenDialog(open)}}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="w-full sm:px-2 flex items-center gap-2">
                    <Trash2 />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this note?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your note can not be recovered once it has been deleted
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={outlineBtnStyles}>Cancel</AlertDialogCancel>
                      <LoadingButton isLoading={isLoading} loadingText='Deleteing...' onClick={() => {
                        setIsLoading(true)
                        deleteNote({
                            noteId
                        }).then(() => {
                            router.push('/dashboard/notes')
                        })
                        .finally(() => {
                            setIsLoading(false)
                        })
                       }}>
                        Delete
                      </LoadingButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>

    <div className="sm:hidden w-full">
        <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
            <DrawerTrigger asChild>
                <Button variant="destructive" size="icon" className="w-full sm:px-2 flex items-center gap-2">
                    <Trash2 />
                    Delete
                </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Are you sure you want to delete this note?</DrawerTitle>
                <DrawerDescription>
                    Your note can not be recovered once it has been deleted
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline" className={outlineBtnStyles}>Cancel</Button>
                </DrawerClose>
                <LoadingButton isLoading={isLoading} loadingText='Deleteing...' onClick={() => {
                        setIsLoading(true)
                        deleteNote({
                            noteId
                        }).then(() => {
                            router.push('/dashboard/notes')
                        })
                        .finally(() => {
                            setIsLoading(false)
                        })
                       }}>
                        Delete
                </LoadingButton>
              </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>
    </>
    )
}