"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export interface Client {
  _id?: string;
  id?: string;
  name: string;
  email?: string;
}

interface ClientPickerProps {
  onClientSelected: (clientId: string) => void;
  onClientsLoaded?: (clients: Client[]) => void;
}

const STORAGE_KEY = "selectedClientId";

export function ClientPicker({
  onClientSelected,
  onClientsLoaded,
}: ClientPickerProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/clients", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch clients");
        const data = await res.json();
        const clientList = Array.isArray(data) ? data : [];
        setClients(clientList);
        onClientsLoaded?.(clientList);

        const stored =
          typeof window !== "undefined"
            ? localStorage.getItem(STORAGE_KEY)
            : null;
        if (stored && clientList.some((c) => (c._id || c.id) === stored)) {
          setSelectedId(stored);
          onClientSelected(stored);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load clients");
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, [onClientSelected, onClientsLoaded]);

  const handleChange = (clientId: string) => {
    setSelectedId(clientId);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, clientId);
    }
    onClientSelected(clientId);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <label className="font-semibold">Select Client:</label>
        <select disabled className="border rounded-md px-3 py-2 bg-gray-100">
          <option>Loading clients...</option>
        </select>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600">
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <label className="font-semibold text-sm">Select Client:</label>
      <select
        value={selectedId}
        onChange={(e) => handleChange(e.target.value)}
        className="border rounded-md px-3 py-2 min-w-[200px]"
      >
        <option value="">-- Choose a client --</option>
        {clients.map((client) => (
          <option
            key={client._id || client.id}
            value={String(client._id || client.id)}
          >
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
}
