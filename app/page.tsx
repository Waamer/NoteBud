"use client"

import { api } from "@/convex/_generated/api";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import UploadDocButton from "./upload-doc-button";

export default function Home() {

  const getDocuments = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="p-12 sm:p-16 md:p-20 xl:p-24 space-y-8">
      <div className="flex justify-between items-center flex-col space-y-3 sm:space-y-0 sm:flex-row">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <UploadDocButton />
      </div>
      <Unauthenticated>
        Please Sign in
      </Unauthenticated>
      <Authenticated>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {getDocuments?.map(document => (
            <DocumentCard key={document._id} document={document}/>
            ))}
        </div>

      </Authenticated>
    </main>
  );
}
