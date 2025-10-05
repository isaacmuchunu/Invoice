"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getInvoices } from "@/lib/data";
import { Invoice } from "@/lib/types";
import { format } from 'date-fns';
import { ArrowUpRight } from "lucide-react";

export function RecentInvoices() {
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const allInvoices = getInvoices();
    const sortedInvoices = allInvoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setRecentInvoices(sortedInvoices.slice(0, 5));
  }, []);

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
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription>The last 5 invoices created.</CardDescription>
      </CardHeader>
      <CardContent>
        {recentInvoices.length > 0 ? (
          <ul className="space-y-4">
            {recentInvoices.map((invoice) => (
              <li key={invoice.id} className="flex justify-between items-center">
                <div className="flex items-center">
                   <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-4">
                        <span className="font-bold text-sm">{invoice.client.name.charAt(0)}</span>
                    </div>
                  <div>
                    <p className="font-medium">{invoice.client.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(invoice.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(invoice.total)}</p>
                  <Badge variant={getStatusVariant(invoice.status)} className="capitalize">
                    {invoice.status}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground">No recent invoices found.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
            <Link href="/invoices">
                View All Invoices <ArrowUpRight className="h-4 w-4 ml-2" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}