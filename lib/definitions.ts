import { z } from 'zod';

export const ClientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  address: z.string().min(1, { message: "Address is required." }),
});

export const InvoiceItemSchema = z.object({
  description: z.string().min(1, "Description cannot be empty."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  price: z.coerce.number().min(0.01, "Price must be positive."),
});

export const InvoiceSchema = z.object({
  clientId: z.string().min(1, "Please select a client."),
  date: z.date({
    required_error: "Invoice date is required.",
  }),
  dueDate: z.date({
    required_error: "Due date is required.",
  }),
  status: z.enum(['pending', 'paid', 'overdue'], {
    errorMap: () => ({ message: "Please select a valid status." })
  }),
  items: z.array(InvoiceItemSchema).min(1, "Invoice must have at least one item."),
});

export type InvoiceFormValues = z.infer<typeof InvoiceSchema>;

export const UserProfileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  companyName: z.string().min(1, "Company name is required."),
  companyAddress: z.string().min(1, "Company address is required."),
});