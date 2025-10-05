import { DashboardHeader } from "@/components/dashboard-header";
import { ClientForm } from "@/components/client-form";

export default function NewClientPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ClientForm />
      </main>
    </div>
  );
}