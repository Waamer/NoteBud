"use client"

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import UploadDocButton from "./upload-doc-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function DocumentsPage() {

  const getDocuments = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="space-y-8 w-full">
      <div className="flex justify-between items-center flex-col space-y-3 sm:space-y-0 sm:flex-row">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <UploadDocButton />
      </div>

        {!getDocuments && (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {new Array(6).fill("").map((_, i) => (
              <Card key={i} className="bg-rose-200/60 dark:bg-rose-950/30 p-6 flex flex-col justify-between space-y-4 h-[211px]">
                <Skeleton className="h-[26px] w-full rounded-sm" />
                <Skeleton className="h-[26px] w-full rounded-sm" />
                <Skeleton className="h-[26px] w-full rounded-sm" />
                <Skeleton className="h-[40px] w-[89px] rounded-md" />
              </Card>
            ))}
          </div>
        )}

        {getDocuments && getDocuments.length === 0 && (
          <div className="flex flex-col justify-center items-center gap-2 pt-8">
            <Image
              src="/add2.svg"
              width="400"
              height="400"
              alt="Hi"
            />
            <h2 className="text-nowrap text-sm sm:text-2xl mb-2">Upload your first document to get started!</h2>
            <div className="hidden sm:block">
              <UploadDocButton />
            </div>
          </div>
        )}

        {getDocuments && getDocuments.length > 0 && (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {getDocuments?.map(document => (
              <DocumentCard key={document._id} document={document}/>
            ))}
          </div>
        )}

    </main>
  );
}
