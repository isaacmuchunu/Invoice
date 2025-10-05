import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { InvoiceChart } from "@/components/invoice-chart";
import { RecentInvoices } from "@/components/recent-invoices";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <InvoiceChart />
          <RecentInvoices />
        </div>
      </main>
    </div>
  );
}