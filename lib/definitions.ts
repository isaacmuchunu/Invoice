import { z } from 'zod';

export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
}

export const ClientSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  address: z.string().min(1, { message: "Address is required." }),
});

export const InvoiceSchema = z.object({
  clientName: z.string().min(1, { message: "Client name is required." }),
  amount: z.coerce.number().gt(0, { message: "Amount must be greater than 0." }),
  status: z.enum(['Paid', 'Pending', 'Overdue'], {
    errorMap: () => ({ message: "Please select a valid status." })
  }),
});