"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { LoadingButton } from "@/components/loading-button"
import { Textarea } from "@/components/ui/textarea"
import { useOrganization } from "@clerk/nextjs"
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  title: z.string().min(1).max(50),
  text: z.string().min(1).max(5000),
})

export default function CreateNoteForm({ onNoteCreated }: { onNoteCreated: () => void }) {

    const createNote = useMutation(api.notes.createNote);
    const organization = useOrganization()
    
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createNote({ 
      title: values.title,
      text: values.text,
      orgId: organization.organization?.id
    })
    onNoteCreated()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4 sm:px-0">
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea  rows={8} placeholder="Your note. After creating a note, more styling can be added when revisting the note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={form.formState.isSubmitting} loadingText="Creating...">
            Create
        </LoadingButton>
      </form>
    </Form>
  );
}
