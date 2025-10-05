"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle form submission,
    // e.g., send data to an API endpoint.
    // For now, we'll just navigate back to the clients page.
    router.push("/clients");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">New Client</h1>
            <p className="text-muted-foreground">Add a new client to your list</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Client Details</CardTitle>
              <CardDescription>Enter the details of the new client</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter client name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter client email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter client address" required />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href="/clients">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">Save Client</Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
}