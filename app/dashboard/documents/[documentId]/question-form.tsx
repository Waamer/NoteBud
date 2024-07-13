'use client'

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    text: z.string().min(1).max(250),
})

export function QuestionForm({ documentId }: { documentId: Id<"documents"> }) {
    const organization = useOrganization()
    const askQuestion = useAction(api.documents.askQuestion)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          text: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await askQuestion({ question: values.text, documentId, orgId: organization.organization?.id })
        form.reset()
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 gap-2 mt-2.5 flex-col sm:flex-row">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Ask a question about your document" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton isLoading={form.formState.isSubmitting} loadingText="Submitting...">
              Submit
          </LoadingButton>
        </form>
      </Form>
    )
}