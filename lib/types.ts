export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: Client;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  total: number;
  status: "paid" | "pending" | "overdue";
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface UserProfile {
  name: string;
  email: string;
  companyName: string;
  companyAddress: string;
}