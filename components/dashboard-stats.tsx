import { invoices } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardStats() {
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid").length;
  const pendingInvoices = invoices.filter((invoice) => invoice.status === "Pending").length;
  const totalRevenue = invoices.reduce((acc, invoice) => acc + invoice.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalInvoices}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Paid</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{paidInvoices}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{pendingInvoices}</p>
        </CardContent>
      </Card>
    </div>
  );
}