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

export function DocumentCard({ document }: {document: Doc<"documents">}) {
    return (
        <Card className="bg-rose-200/60 dark:bg-rose-950/30">
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        Card Content
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="bg-rose-600/15 hover:bg-rose-600/25 dark:bg-rose-950 dark:hover:bg-rose-900/60 border-none">View</Button>
      </CardFooter>
    </Card>
    )
}