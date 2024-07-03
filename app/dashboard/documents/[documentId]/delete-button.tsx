"use client"

import { LoadingButton } from "@/components/loading-button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { btnIconStyles, btnStyles, outlineBtnStyles } from "@/styles/styles"
import { useMutation } from "convex/react"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DeleteButton({ documentId }: { documentId: Id<"documents"> }) {
    
    const [isLoading, setIsLoading] = useState(false)
    const deleteDocument = useMutation(api.documents.deleteDocument)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => {setIsOpen(open)}}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className={btnStyles}>
                    <Trash2 className={btnIconStyles}/>
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this document?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your document can not be recovered once it has been deleted
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={outlineBtnStyles}>Cancel</AlertDialogCancel>
                      <LoadingButton isLoading={isLoading} loadingText='Deleteing...' onClick={() => {
                        setIsLoading(true)
                        deleteDocument({
                            documentId
                        }).then(() => {
                            router.push('/')
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
    )
}