"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { InvoiceForm } from "@/components/invoice-form";
import { getInvoiceById } from "@/lib/data";
import { Invoice } from "@/lib/types";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

export default function EditInvoicePage({ params }: { params: { id: string } }) {
  const [invoice, setInvoice] = useState<Invoice | null | undefined>(undefined);

  useEffect(() => {
    const foundInvoice = getInvoiceById(params.id);
    setInvoice(foundInvoice);
  }, [params.id]);

  if (invoice === undefined) {
    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader />
            <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
                <p>Loading...</p>
            </main>
        </div>
    );
  }

  if (invoice === null) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <InvoiceForm initialData={invoice} />
      </main>
    </div>
  );
}