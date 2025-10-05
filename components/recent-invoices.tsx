import { invoices } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecentInvoices() {
  const recentInvoices = invoices.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {recentInvoices.map((invoice) => (
            <li key={invoice.id} className="flex justify-between items-center mb-2">
              <div>
                <p>{invoice.clientName}</p>
                <p className="text-sm text-muted-foreground">{invoice.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${invoice.amount.toFixed(2)}</p>
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
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}