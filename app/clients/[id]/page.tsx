"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useData } from "@/hooks/use-data";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Client } from "@/lib/definitions";

export default function ViewClientPage() {
  const params = useParams();
  const { clients } = useData();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const clientId = params.id as string;
    const currentClient = clients.find(c => c.id === clientId);
    if (currentClient) {
      setClient(currentClient);
    }
  }, [params.id, clients]);

  if (!client) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container mx-auto px-4 py-8">
          <p>Client not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{client.name}</CardTitle>
            <CardDescription>Details for {client.name}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{client.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Address</h3>
              <p>{client.address}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}