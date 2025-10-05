import { Client, Invoice, UserProfile } from "./types";

const INVOICES_KEY = "invoices";
const CLIENTS_KEY = "clients";
const USER_PROFILE_KEY = "userProfile";

// Helper to safely access localStorage
const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage for key "${key}":`, error);
  }
};

// Seed data
const initialClients: Client[] = [
  { id: "1", name: "Acme Inc.", email: "contact@acme.com", address: "123 Main St, Anytown USA" },
  { id: "2", name: "Stark Industries", email: "tony@stark.com", address: "10880 Malibu Point, Malibu CA" },
];

const initialInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV001",
    client: initialClients[0],
    date: "2024-05-01",
    dueDate: "2024-06-01",
    items: [
      { description: "Web Design Services", quantity: 1, price: 1500 },
      { description: "Hosting (1 year)", quantity: 1, price: 300 },
    ],
    total: 1800,
    status: "paid",
  },
  {
    id: "2",
    invoiceNumber: "INV002",
    client: initialClients[1],
    date: "2024-05-15",
    dueDate: "2024-06-15",
    items: [{ description: "Consulting Services", quantity: 10, price: 200 }],
    total: 2000,
    status: "pending",
  },
];

const initialUserProfile: UserProfile = {
    name: "Jules",
    email: "jules@example.com",
    companyName: "Jules' Dev Shop",
    companyAddress: "456 Side St, Anytown USA",
}

// Initialize with seed data if none exists
if (typeof window !== 'undefined' && !localStorage.getItem(CLIENTS_KEY)) {
  saveToLocalStorage(CLIENTS_KEY, initialClients);
}
if (typeof window !== 'undefined' && !localStorage.getItem(INVOICES_KEY)) {
  saveToLocalStorage(INVOICES_KEY, initialInvoices);
}
if (typeof window !== 'undefined' && !localStorage.getItem(USER_PROFILE_KEY)) {
    saveToLocalStorage(USER_PROFILE_KEY, initialUserProfile);
}

// --- Invoice Functions ---
export const getInvoices = (): Invoice[] => getFromLocalStorage(INVOICES_KEY, []);
export const getInvoiceById = (id: string): Invoice | undefined => getInvoices().find(inv => inv.id === id);
export const addInvoice = (invoice: Omit<Invoice, "id" | "invoiceNumber">): Invoice => {
  const invoices = getInvoices();
  const newInvoice: Invoice = {
    ...invoice,
    id: (invoices.length + 1).toString(),
    invoiceNumber: `INV${(invoices.length + 1).toString().padStart(3, "0")}`,
  };
  saveToLocalStorage(INVOICES_KEY, [...invoices, newInvoice]);
  return newInvoice;
};
export const updateInvoice = (id: string, updatedInvoice: Partial<Invoice>): Invoice | undefined => {
  const invoices = getInvoices();
  const index = invoices.findIndex(inv => inv.id === id);
  if (index === -1) return undefined;
  invoices[index] = { ...invoices[index], ...updatedInvoice };
  saveToLocalStorage(INVOICES_KEY, invoices);
  return invoices[index];
};
export const deleteInvoice = (id: string): void => {
  const invoices = getInvoices();
  saveToLocalStorage(INVOICES_KEY, invoices.filter(inv => inv.id !== id));
};

// --- Client Functions ---
export const getClients = (): Client[] => getFromLocalStorage(CLIENTS_KEY, []);
export const getClientById = (id: string): Client | undefined => getClients().find(c => c.id === id);
export const addClient = (client: Omit<Client, "id">): Client => {
  const clients = getClients();
  const newClient: Client = { ...client, id: (clients.length + 1).toString() };
  saveToLocalStorage(CLIENTS_KEY, [...clients, newClient]);
  return newClient;
};
export const updateClient = (id: string, updatedClient: Partial<Client>): Client | undefined => {
  const clients = getClients();
  const index = clients.findIndex(c => c.id === id);
  if (index === -1) return undefined;
  clients[index] = { ...clients[index], ...updatedClient };
  saveToLocalStorage(CLIENTS_KEY, clients);
  return clients[index];
};
export const deleteClient = (id: string): void => {
  const clients = getClients();
  saveToLocalStorage(CLIENTS_KEY, clients.filter(c => c.id !== id));
};

// --- User Profile Functions ---
export const getUserProfile = (): UserProfile => getFromLocalStorage(USER_PROFILE_KEY, initialUserProfile);
export const updateUserProfile = (profile: UserProfile): void => {
    saveToLocalStorage(USER_PROFILE_KEY, profile);
}