"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getInvoices } from "@/lib/data";
import { Invoice } from "@/lib/types";
import { format, subMonths } from 'date-fns';

interface ChartData {
  name: string;
  paid: number;
  pending: number;
}

export function InvoiceChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const invoices = getInvoices();
    const data = processInvoicesForChart(invoices);
    setChartData(data);
  }, []);

  const processInvoicesForChart = (invoices: Invoice[]): ChartData[] => {
    const last6Months = Array.from({ length: 6 }, (_, i) => subMonths(new Date(), i));
    const monthlyData: { [key: string]: { paid: number; pending: number } } = {};

    last6Months.forEach(date => {
        const monthName = format(date, 'MMM');
        monthlyData[monthName] = { paid: 0, pending: 0 };
    });

    invoices.forEach(invoice => {
      const invoiceMonth = format(new Date(invoice.date), 'MMM');
      if (monthlyData[invoiceMonth] !== undefined) {
        if (invoice.status === 'paid') {
          monthlyData[invoiceMonth].paid += invoice.total;
        } else if (invoice.status === 'pending' || invoice.status === 'overdue') {
          monthlyData[invoiceMonth].pending += invoice.total;
        }
      }
    });

    return Object.keys(monthlyData).map(name => ({
      name,
      paid: monthlyData[name].paid,
      pending: monthlyData[name].pending,
    })).reverse();
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue Overview</CardTitle>
        <CardDescription>Paid vs. Pending invoices over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${Number(value) / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend iconType="circle" />
              <Bar dataKey="paid" fill="hsl(var(--primary))" name="Paid" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="hsl(var(--secondary))" name="Pending" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">No invoice data to display.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}