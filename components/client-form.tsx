"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSchema } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Client } from "@/lib/types";
import { addClient, updateClient } from "@/lib/data";
import { z } from "zod";

interface ClientFormProps {
  initialData?: Client;
}

type ClientFormValues = z.infer<typeof ClientSchema>;

export function ClientForm({ initialData }: ClientFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(ClientSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      address: "",
    },
  });

  const onSubmit = (values: ClientFormValues) => {
    try {
      if (isEditMode && initialData) {
        updateClient(initialData.id, values);
        toast.success("Client updated successfully!");
      } else {
        addClient(values);
        toast.success("Client created successfully!");
      }
      router.push("/clients");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred while saving the client.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{isEditMode ? "Edit Client" : "New Client"}</CardTitle>
            <CardDescription>
              {isEditMode ? "Update the client's details." : "Fill out the form to add a new client."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.g. johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 123 Main St, Anytown USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">{isEditMode ? "Update Client" : "Save Client"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}