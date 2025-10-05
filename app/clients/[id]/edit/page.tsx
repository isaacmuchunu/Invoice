"use client";

import { useState, useEffect } from "react";
import { useData } from "@/hooks/use-data";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Client } from "@/lib/definitions";
import { toast } from "sonner";

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const { clients, updateClient } = useData();
  const [client, setClient] = useState<Client | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const clientId = params.id as string;
    const currentClient = clients.find(c => c.id === clientId);
    if (currentClient) {
      setClient(currentClient);
      setName(currentClient.name);
      setEmail(currentClient.email);
      setAddress(currentClient.address);
    }
  }, [params.id, clients]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (client) {
      updateClient({ ...client, name, email, address });
      toast("Client has been updated.", {
        description: "The client's details have been successfully saved.",
      });
      router.push("/clients");
    }
  };

  if (!client) {
    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader />
            <main className="flex-1 container mx-auto px-4 py-8">
                <p>Client not found</p>
            </main>
        </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Edit Client</h1>
            <p className="text-muted-foreground">Update the client&apos;s details</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Client Details</CardTitle>
              <CardDescription>Update the details for {client.name}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter client name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter client email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter client address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href="/clients">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
}