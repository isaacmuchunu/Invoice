"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash, PlusCircle, UserX } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { getClients, deleteClient as deleteClientFromDb } from "@/lib/data";
import { Client } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ITEMS_PER_PAGE = 10;

export function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);

  const fetchClients = () => {
    setLoading(true);
    const allClients = getClients();
    setClients(allClients);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = (id: string) => {
    deleteClientFromDb(id);
    fetchClients(); // Re-fetch to update the list
    toast.success("Client has been deleted successfully.");
  };

  const openDeleteDialog = (id: string) => {
    setClientToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredClients.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredClients, currentPage]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Loading clients...</p>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed rounded-lg">
        <UserX className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-xl font-semibold">No Clients Found</h3>
        <p className="mt-2 text-muted-foreground">
          You haven&apos;t added any clients yet. Get started now.
        </p>
        <Button asChild className="mt-6">
          <Link href="/clients/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Client
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-start items-center mb-6">
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/clients/${client.id}/edit`} className="flex items-center w-full cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDeleteDialog(client.id)} className="text-red-500 cursor-pointer">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <span className="text-sm text-muted-foreground">
          Showing {Math.min(filteredClients.length, ITEMS_PER_PAGE * currentPage)} of {filteredClients.length} clients
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the client.
              Any invoices associated with this client will not be deleted but will retain the client&apos;s information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (clientToDelete) {
                  handleDelete(clientToDelete);
                }
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}