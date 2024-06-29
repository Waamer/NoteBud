"use client"

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { title } from "process";

export default function Home() {

  const getDocuments = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        Please Sign in
      </Unauthenticated>
      <Authenticated>

        Signed In

        <Button onClick={() => {
          createDocument({ title: "Hello World"})
        }}>Click Me </Button>
        <ul>
          {getDocuments?.map(document => (
            <li key={document._id}>{document.title}</li>
          ))}
        </ul>
      </Authenticated>
    </main>
  );
}
