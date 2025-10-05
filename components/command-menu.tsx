"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { CommandIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="p-2"
        onClick={() => setOpen(true)}
      >
        <CommandIcon className="h-4 w-4" />
        <span className="sr-only">Open command menu</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => navigate("/")}>
              <span>Invoices</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/dashboard")}>
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/clients")}>
              <span>Clients</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/settings")}>
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}