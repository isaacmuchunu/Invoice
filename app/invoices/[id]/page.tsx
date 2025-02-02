"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  const invoice = {
    id: params.id,
    client: "Acme Corp",
    amount: 1250.00,
    date: "2024-03-20",
    dueDate: "2024-04-20",
    status: "pending",
    items: [
      { description: "Web Development", quantity: 1, rate: 1000, amount: 1000 },
      { description: "UI Design", quantity: 5, rate: 50, amount: 250 },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Invoice {invoice.id}</h1>
            <p className="text-muted-foreground">View and manage invoice details</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => console.log("Download PDF")}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={() => console.log("Send Invoice")}>
              <Send className="mr-2 h-4 w-4" />
              Send Invoice
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant={
                    invoice.status === "paid"
                      ? "success"
                      : invoice.status === "pending"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {invoice.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice Date</span>
                <span>{invoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date</span>
                <span>{invoice.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold">${invoice.amount.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Client Information</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{invoice.client}</p>
                <p className="text-muted-foreground">123 Business Street</p>
                <p className="text-muted-foreground">contact@acmecorp.com</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Quantity</th>
                    <th className="text-right py-2">Rate</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="text-right py-2">{item.quantity}</td>
                      <td className="text-right py-2">${item.rate}</td>
                      <td className="text-right py-2">${item.amount}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td colSpan={3} className="text-right py-4">Total</td>
                    <td className="text-right py-4">${invoice.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}