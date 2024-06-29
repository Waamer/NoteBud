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
import UploadDocForm from "./upload-doc-form";
import { useState } from "react";
  

export default function CreateDocButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>    
            <Button className="w-full max-w-[300px] sm:w-auto">
                Upload Document
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload a document</DialogTitle>
                <DialogDescription>
                   Upload a team document for you to search over in the future
                </DialogDescription>
                
                <UploadDocForm onUpload={() => setIsOpen(false) } />

            </DialogHeader>
        </DialogContent>
    </Dialog>
  );
}
