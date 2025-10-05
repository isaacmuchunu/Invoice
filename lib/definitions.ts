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