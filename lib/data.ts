import { Invoice, Client } from './definitions';

export const invoices: Invoice[] = [
  {
    id: '1',
    clientName: 'Acme Inc.',
    amount: 1250.00,
    status: 'Paid',
    date: '2023-10-26',
  },
  {
    id: '2',
    clientName: 'Stark Industries',
    amount: 2500.00,
    status: 'Pending',
    date: '2023-10-25',
  },
  {
    id: '3',
    clientName: 'Wayne Enterprises',
    amount: 800.00,
    status: 'Paid',
    date: '2023-10-24',
  },
  {
    id: '4',
    clientName: 'Ollivander\'s Wand Shop',
    amount: 550.00,
    status: 'Overdue',
    date: '2023-09-15',
  },
    {
    id: '5',
    clientName: 'Gringotts Bank',
    amount: 3500.00,
    status: 'Pending',
    date: '2023-10-28',
  },
];

export const clients: Client[] = [
  {
    id: '1',
    name: 'Acme Inc.',
    email: 'contact@acme.com',
    address: '123 Main St, Anytown, USA',
  },
  {
    id: '2',
    name: 'Stark Industries',
    email: 'tony@starkindustries.com',
    address: '10880 Malibu Point, 90265',
  },
  {
    id: '3',
    name: 'Wayne Enterprises',
    email: 'bruce@wayne.com',
    address: '1007 Mountain Drive, Gotham City',
  },
  {
    id: '4',
    name: 'Ollivander\'s Wand Shop',
    email: 'contact@ollivanders.co.uk',
    address: 'Diagon Alley, London',
  },
    {
    id: '5',
    name: 'Gringotts Bank',
    email: 'support@gringotts.com',
    address: 'Diagon Alley, London',
  },
];