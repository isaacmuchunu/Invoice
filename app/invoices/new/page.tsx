"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { InvoiceForm } from "@/components/invoice-form";

export default function NewInvoicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Invoice</h1>
          <p className="text-muted-foreground">Fill in the details for your new invoice</p>
        </div>
        <InvoiceForm />
      </main>
    </div>
  );
}