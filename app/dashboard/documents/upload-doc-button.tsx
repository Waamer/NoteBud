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
import { Upload } from "lucide-react";
import { btnIconStyles, btnStyles, outlineBtnStyles } from "@/styles/styles";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
  

export default function UploadDocButton() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  return (
          <>
          <div className="hidden sm:block">
            <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
              <DialogTrigger asChild>
                <Button className={btnStyles}><Upload className={btnIconStyles} />Upload Document</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload a document</DialogTitle>
                  <DialogDescription>
                    Upload a team document for you to search over in the future
                  </DialogDescription>
                </DialogHeader>
                <UploadDocForm onUpload={() => setIsOpenDialog(false) } />
              </DialogContent>
          </Dialog>
        </div>
  
        <div className="sm:hidden">
          <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
            <DrawerTrigger asChild>
              <Button className={btnStyles}><Upload className={btnIconStyles} />Upload Document</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Upload a document</DrawerTitle>
                <DrawerDescription>
                  Upload a team document for you to search over in the future
                </DrawerDescription>
              </DrawerHeader>
              <UploadDocForm onUpload={() => setIsOpenDrawer(false) } />
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline" className={outlineBtnStyles}>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        </>
  );
}
