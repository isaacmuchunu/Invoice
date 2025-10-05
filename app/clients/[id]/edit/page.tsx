"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { ClientForm } from "@/components/client-form";
import { getClientById } from "@/lib/data";
import { Client } from "@/lib/types";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

export default function EditClientPage({ params }: { params: { id: string } }) {
  const [client, setClient] = useState<Client | null | undefined>(undefined);

  useEffect(() => {
    const foundClient = getClientById(params.id);
    setClient(foundClient);
  }, [params.id]);

  if (client === undefined) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  if (client === null) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ClientForm initialData={client} />
      </main>
    </div>
  );
}