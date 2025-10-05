"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useData } from "@/hooks/use-data";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@/lib/definitions";

export default function ViewInvoicePage() {
  const params = useParams();
  const { invoices } = useData();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const invoiceId = params.id as string;
    const currentInvoice = invoices.find(inv => inv.id === invoiceId);
    if (currentInvoice) {
      setInvoice(currentInvoice);
    }
  }, [params.id, invoices]);

  if (!invoice) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container mx-auto px-4 py-8">
          <p>Invoice not found</p>
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
            <CardTitle>Invoice #{invoice.id}</CardTitle>
            <CardDescription>Details for invoice to {invoice.clientName}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="font-semibold">Client</h3>
              <p>{invoice.clientName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Amount</h3>
              <p>${invoice.amount.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>
                <Badge
                  variant={
                    invoice.status === "Paid"
                      ? "default"
                      : invoice.status === "Pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {invoice.status}
                </Badge>
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Date</h3>
              <p>{invoice.date}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}