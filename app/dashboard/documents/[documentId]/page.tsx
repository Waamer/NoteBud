import { Id } from "@/convex/_generated/dataModel"
import DocumentPage from "./DocumentPage"

export const metadata = {
  title:"Doc | NoteBud"
}

export default function DocPage({ params }: { params: { documentId: Id<"documents"> } }) {
  return <DocumentPage params={params} />
}