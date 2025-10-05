"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getInvoiceById, getUserProfile } from "@/lib/data";
import { Invoice, UserProfile } from "@/lib/types";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowLeft, Printer, Pencil } from "lucide-react";
import Link from "next/link";

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const foundInvoice = getInvoiceById(params.id);
    const profile = getUserProfile();
    setInvoice(foundInvoice);
    setUserProfile(profile);
  }, [params.id]);

  if (invoice === undefined) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
          <p>Loading invoice...</p>
        </main>
      </div>
    );
  }

  if (invoice === null || userProfile === null) {
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
            <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            <div className="flex gap-2">
                <Button asChild variant="outline">
                    <Link href={`/invoices/${invoice.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Link>
                </Button>
                <Button onClick={() => window.print()}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                </Button>
            </div>
        </div>

        <Card className="print:shadow-none print:border-none">
          <CardHeader className="bg-muted/50 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">Invoice</h1>
                <p className="text-muted-foreground">#{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-semibold">{userProfile.companyName}</h2>
                <p className="text-sm text-muted-foreground">{userProfile.companyAddress}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Billed To</h3>
                <p>{invoice.client.name}</p>
                <p className="text-sm text-muted-foreground">{invoice.client.email}</p>
                <p className="text-sm text-muted-foreground">{invoice.client.address}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Invoice Date</h3>
                <p>{format(new Date(invoice.date), "MMMM d, yyyy")}</p>
                <h3 className="font-semibold mb-2 mt-4">Due Date</h3>
                <p>{format(new Date(invoice.dueDate), "MMMM d, yyyy")}</p>
              </div>
               <div className="text-left md:text-right">
                <h3 className="font-semibold mb-2">Status</h3>
                <Badge variant={getStatusVariant(invoice.status)} className="text-lg capitalize">
                    {invoice.status}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.description}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.quantity * item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold text-lg">Total</TableCell>
                  <TableCell className="text-right font-bold text-lg">{formatCurrency(invoice.total)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}