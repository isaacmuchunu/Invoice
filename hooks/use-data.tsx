"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { invoices as initialInvoices, clients as initialClients } from '@/lib/data';
import { Invoice, Client } from '@/lib/definitions';

interface DataContextProps {
  invoices: Invoice[];
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  deleteClient: (id: string) => void;
  updateClient: (client: Client) => void;
  deleteInvoice: (id: string) => void;
  updateInvoice: (invoice: Invoice) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [clients, setClients] = useState<Client[]>(initialClients);

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient = { ...client, id: (clients.length + 1).toString() };
    setClients(prevClients => [...prevClients, newClient]);
  };

  const deleteClient = (id: string) => {
    setClients(prevClients => prevClients.filter(client => client.id !== id));
  };

  const updateClient = (updatedClient: Client) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.id !== id));
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(prevInvoices =>
      prevInvoices.map(invoice =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  };

  return (
    <DataContext.Provider value={{ invoices, clients, addClient, deleteClient, updateClient, deleteInvoice, updateInvoice }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};