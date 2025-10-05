import { DashboardHeader } from "@/components/dashboard-header";
import { InvoiceForm } from "@/components/invoice-form";

export default function NewInvoicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <InvoiceForm />
      </main>
    </div>
  );
}