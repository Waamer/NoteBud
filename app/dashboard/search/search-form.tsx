'use client'

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    search: z.string().min(1).max(250),
})

export function SearchForm({ setResults }: { setResults: (notes: typeof api.search.searchAction._returnType) => void }) {
    const organization = useOrganization()
    const searchAction = useAction(api.search.searchAction)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          search: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await searchAction({ search: values.search, orgId: organization.organization?.id }).then(setResults)
        form.reset()
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 gap-2 mt-2.5 flex-col sm:flex-row">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Search over all your notes/documents using vector search" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton isLoading={form.formState.isSubmitting} loadingText="Searching...">
              Search
          </LoadingButton>
        </form>
      </Form>
    )
}