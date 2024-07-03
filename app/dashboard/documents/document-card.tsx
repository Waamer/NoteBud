import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"
import { Eye, Loader2 } from "lucide-react"
import Link from "next/link"

export function DocumentCard({ document }: {document: Doc<"documents">}) {
    return (
        <Card className="bg-rose-200/60 dark:bg-rose-950/30">
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription>Chat with your document from the View button</CardDescription>
      </CardHeader>
      <CardContent>
        {!document.description ? <div className="flex justify-center"><Loader2 className="animate-spin" /></div> : document.description}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline" className="group bg-rose-600/15 hover:bg-rose-600/25 dark:bg-rose-950 dark:hover:bg-rose-900/60 border-none flex items-center gap-2">
          <Link href={"/dashboard/documents/" + document._id}>
            <Eye className="size-4 group-hover:scale-125 transition-all" />
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
    )
}