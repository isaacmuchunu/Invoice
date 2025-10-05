"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getClientById, getInvoices } from "@/lib/data";
import { Client, Invoice } from "@/lib/types";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Pencil, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { InvoiceList } from "@/components/invoice-list";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [client, setClient] = useState<Client | null | undefined>(undefined);
  const [clientInvoices, setClientInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const foundClient = getClientById(params.id);
    setClient(foundClient);
    if (foundClient) {
      const allInvoices = getInvoices();
      const invoicesForClient = allInvoices.filter(invoice => invoice.client.id === foundClient.id);
      setClientInvoices(invoicesForClient);
    }
  }, [params.id]);

  if (client === undefined) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
          <p>Loading client...</p>
        </main>
      </div>
    );
  }

  if (client === null) {
    notFound();
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusVariant = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => router.push('/clients')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Button>
          <Button asChild>
            <Link href={`/clients/${client.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Client
            </Link>
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{client.name}</CardTitle>
            <CardDescription>Client Details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                <span>{client.email}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{client.address}</span>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Invoices for {client.name}</h2>
        {clientInvoices.length > 0 ? (
           <div className="rounded-lg border">
                <div className="grid grid-cols-1 divide-y">
                    {clientInvoices.map(invoice => (
                        <Link key={invoice.id} href={`/invoices/${invoice.id}`}>
                            <div className="p-4 hover:bg-muted/50 cursor-pointer grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                <div>
                                    <p className="font-medium">#{invoice.invoiceNumber}</p>
                                    <p className="text-sm text-muted-foreground">{format(new Date(invoice.date), "MMM d, yyyy")}</p>
                                </div>
                                <div className="text-right md:text-left">
                                    <p className="font-semibold">{formatCurrency(invoice.total)}</p>
                                </div>
                                <div className="col-span-2 md:col-span-1 flex justify-end">
                                     <Badge variant={getStatusVariant(invoice.status)} className="capitalize">
                                        {invoice.status}
                                    </Badge>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
           </div>
        ) : (
            <p className="text-muted-foreground">No invoices found for this client.</p>
        )}
      </main>
    </div>
  );
}