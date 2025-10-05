"use client";

import { useState, useEffect } from "react";
import { useData } from "@/hooks/use-data";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Invoice } from "@/lib/definitions";

export default function EditInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const { invoices, updateInvoice } = useData();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Pending');

  useEffect(() => {
    const invoiceId = params.id as string;
    const currentInvoice = invoices.find(inv => inv.id === invoiceId);
    if (currentInvoice) {
      setInvoice(currentInvoice);
      setClientName(currentInvoice.clientName);
      setAmount(currentInvoice.amount);
      setStatus(currentInvoice.status);
    }
  }, [params.id, invoices]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (invoice) {
      updateInvoice({ ...invoice, clientName, amount, status });
      router.push("/");
    }
  };

  if (!invoice) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container mx-auto px-4 py-8">
          <p>Invoice not found</p>
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
            <h1 className="text-3xl font-bold">Edit Invoice</h1>
            <p className="text-muted-foreground">Update the invoice details</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>Update the details for invoice {invoice.id}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  placeholder="Enter client name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: 'Paid' | 'Pending' | 'Overdue') => setStatus(value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href="/">
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