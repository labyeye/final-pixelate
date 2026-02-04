import { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Client {
  id: string;
  name: string;
}

interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  status: string;
  title?: string;
}

interface PaymentReceiptModalProps {
  clients: Client[];
  invoices: Invoice[];
  onPaymentSubmit?: (data: any) => void;
}

export function PaymentReceiptModal({
  clients,
  invoices,
  onPaymentSubmit,
}: PaymentReceiptModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [paymentMethod, setPaymentMethod] = useState<string>("bank_transfer");
  const [clientOpen, setClientOpen] = useState(false);

  // Filter invoices for the selected client that are not paid
  const clientPendingInvoices = useMemo(() => {
    if (!selectedClient) return [];
    return invoices.filter(
      (inv) =>
        (String(inv.clientId) === String(selectedClient.id) ||
          String(inv.clientId) === String((selectedClient as any)._id)) && // Handle _id vs id discrepancy
        inv.status !== "PAID",
    );
  }, [selectedClient, invoices]);

  const handleSubmit = () => {
    if (onPaymentSubmit) {
      onPaymentSubmit({
        client: selectedClient,
        invoice: selectedInvoice,
        amount: Number(amount),
        date,
        method: paymentMethod,
      });
    }
    setOpen(false);
    // Reset form
    setSelectedClient(null);
    setSelectedInvoice(null);
    setAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="font-bold gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <CreditCard className="w-4 h-4" />
          Receive Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-2 border-black/10 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-primary tracking-tight">
            Record Payment
          </DialogTitle>
          <DialogDescription>
            Select a client and an outstanding booking/invoice to record a
            payment.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Client Selection */}
          <div className="grid gap-2">
            <Label htmlFor="client" className="font-bold text-muted-foreground">
              Client
            </Label>
            <Popover open={clientOpen} onOpenChange={setClientOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={clientOpen}
                  className="w-full justify-between font-normal text-base h-11"
                >
                  {selectedClient ? selectedClient.name : "Select client..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search client..." />
                  <CommandList>
                    <CommandEmpty>No client found.</CommandEmpty>
                    <CommandGroup>
                      {clients.map((client) => (
                        <CommandItem
                          key={client.id || (client as any)._id}
                          value={client.name}
                          onSelect={() => {
                            setSelectedClient(client);
                            setSelectedInvoice(null);
                            setAmount("");
                            setClientOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedClient?.id === client.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {client.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Invoice/Booking Selection (Dependent on Client) */}
          <div className="grid gap-2">
            <Label
              htmlFor="invoice"
              className="font-bold text-muted-foreground"
            >
              Booking / Invoice
            </Label>
            <Select
              disabled={!selectedClient}
              onValueChange={(val) => {
                const inv = clientPendingInvoices.find((i) => i.id === val);
                setSelectedInvoice(inv || null);
                if (inv) setAmount(String(inv.amount));
              }}
            >
              <SelectTrigger className="h-11">
                <SelectValue
                  placeholder={
                    selectedClient
                      ? "Select pending invoice"
                      : "Select a client first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {clientPendingInvoices.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No pending invoices found
                  </SelectItem>
                ) : (
                  clientPendingInvoices.map((inv) => (
                    <SelectItem key={inv.id} value={inv.id}>
                      {inv.title || `Invoice #${inv.id}`} - ₹{inv.amount}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount */}
            <div className="grid gap-2">
              <Label
                htmlFor="amount"
                className="font-bold text-muted-foreground"
              >
                Amount Received
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">
                  ₹
                </span>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7 h-11 font-bold text-lg"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="grid gap-2">
              <Label className="font-bold text-muted-foreground">Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Picker */}
          <div className="grid gap-2">
            <Label className="font-bold text-muted-foreground">
              Payment Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal h-11",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="font-bold px-8"
            disabled={!selectedInvoice || !amount}
          >
            Confirm Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
