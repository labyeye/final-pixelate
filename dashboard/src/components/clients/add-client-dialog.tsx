"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Client } from "@/lib/data";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { apiFetch } from "@/lib/api-fetch";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    name: z.string().min(2, "Client name is required."),
    email: z.string().email("Invalid email address."),
    phone: z.string().min(10, "Invalid phone number."),
    address: z.string().min(5, "Address is required."),
    city: z.string().min(2, "City is required."),
    state: z.string().min(2, "State is required."),
    pin: z.string().min(6, "PIN must be at least 6 digits."),
    hasGst: z.boolean().default(false),
    gstCompanyName: z.string().optional(),
    gstNumber: z.string().optional(),
    gstAddress: z.string().optional(),

    loginEmail: z
      .string()
      .email("Invalid login email.")
      .optional()
      .or(z.literal("")),
    loginPassword: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .optional()
      .or(z.literal("")),

    product: z.enum(["none", "nesthr", "nestleads", "nestsports"]).default("none"),
    externalTenantId: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.hasGst) {
        return !!data.gstCompanyName && !!data.gstNumber && !!data.gstAddress;
      }
      return true;
    },
    {
      message: "GST details are required when toggled on.",
      path: ["gstCompanyName"],
    },
  );

type AddClientDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddClient?: (
    newClient: Omit<Client, "id">,
  ) => void | Promise<void | Client>;

  onSave?: (
    id: string | number,
    update: Partial<Client>,
  ) => void | Promise<void | Client>;

  initialValues?: Partial<Client>;
  children: React.ReactNode;
};

export function AddClientDialog({
  isOpen,
  setIsOpen,
  onAddClient,
  onSave,
  initialValues,
  children,
}: AddClientDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      email: initialValues?.email ?? "",
      phone: initialValues?.phone ?? "",
      address: initialValues?.address ?? "",
      city: (initialValues as any)?.city ?? "",
      state: (initialValues as any)?.state ?? "",
      pin: (initialValues as any)?.pin ?? "",
      hasGst: initialValues?.hasGst ?? false,
      loginEmail: initialValues?.loginEmail ?? "",
      loginPassword: "",
      product: (initialValues as any)?.product ?? "none",
      externalTenantId: (initialValues as any)?.externalTenantId ?? "",
    },
  });

  const product = form.watch("product");

  const hasGst = form.watch("hasGst");

  const [showNestSportsCreate, setShowNestSportsCreate] = useState(false);
  const [nsOwnerName, setNsOwnerName] = useState("");
  const [nsOwnerEmail, setNsOwnerEmail] = useState("");
  const [nsStudentCount, setNsStudentCount] = useState("");
  const [nsEmployeeCount, setNsEmployeeCount] = useState("0");
  const [nsWantsWhatsapp, setNsWantsWhatsapp] = useState(false);
  const [nsBillingCycle, setNsBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [nsOfferCode, setNsOfferCode] = useState("");
  const [nsCreating, setNsCreating] = useState(false);
  const [nsError, setNsError] = useState<string | null>(null);
  const [nsResult, setNsResult] = useState<{
    ownerEmail: string;
    amount: number;
    renewalDate: string;
  } | null>(null);

  async function handleCreateNestSportsSubscription() {
    setNsError(null);
    const name = form.getValues("name");
    const email = form.getValues("email");
    const phone = form.getValues("phone");
    const ownerName = nsOwnerName.trim() || name;
    const ownerEmail = nsOwnerEmail.trim() || email;
    const count = Number(nsStudentCount);

    if (!name || !email || !phone) {
      setNsError("Fill in the client name, email and phone above first.");
      return;
    }
    if (!count || count < 1) {
      setNsError("Enter a valid student count.");
      return;
    }

    setNsCreating(true);
    try {
      const res = await apiFetch("/api/nestsports-companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: name,
          companyEmail: email,
          companyPhone: phone,
          ownerName,
          ownerEmail,
          studentCount: count,
          employeeCount: Number(nsEmployeeCount) || 0,
          wantsWhatsapp: nsWantsWhatsapp,
          billingCycle: nsBillingCycle,
          offerCode: nsOfferCode.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? data?.error ?? "Failed to create subscription");

      form.setValue("externalTenantId", data.data.company._id);
      setNsResult({
        ownerEmail,
        amount: data.data.amount,
        renewalDate: data.data.renewalDate,
      });
    } catch (err: any) {
      setNsError(err.message ?? "Failed to create subscription");
    } finally {
      setNsCreating(false);
    }
  }

  useEffect(() => {
    if (initialValues) {
      form.reset({
        name: initialValues.name ?? "",
        email: initialValues.email ?? "",
        phone: initialValues.phone ?? "",
        address: initialValues.address ?? "",
        city: (initialValues as any).city ?? "",
        state: (initialValues as any).state ?? "",
        pin: (initialValues as any).pin ?? "",
        hasGst: initialValues.hasGst ?? false,
        gstCompanyName: initialValues.gstCompanyName ?? undefined,
        gstNumber: initialValues.gstNumber ?? undefined,
        gstAddress: initialValues.gstAddress ?? undefined,
        loginEmail: initialValues.loginEmail ?? "",
        loginPassword: "",
        product: (initialValues as any).product ?? "none",
        externalTenantId: (initialValues as any).externalTenantId ?? "",
      });
    }
  }, [initialValues]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (initialValues && (initialValues._id || initialValues.id)) {
      const id = initialValues._id ?? initialValues.id;
      if (onSave) {
        await onSave(id as any, values as Partial<Client>);
      }
    } else {
      if (onAddClient) {
        await onAddClient(values);
      }
    }
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl font-black tracking-tighter">
            {initialValues ? "Edit Client" : "New Client"}
          </DialogTitle>
          <DialogDescription>
            {initialValues
              ? "Update client details and portal login credentials."
              : "Fill in the details below to create a new client."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
              {}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code</FormLabel>
                      <FormControl>
                        <Input inputMode="numeric" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Client Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="border-t-2 border-black" />

              {}
              <div className="space-y-3">
                <div>
                  <h4 className="text-base font-bold">
                    Portal Login Credentials
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Set a login email and password so this client can access
                    their portal.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-black rounded-lg p-4">
                  <FormField
                    control={form.control}
                    name="loginEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Login Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="client@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loginPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {initialValues
                            ? "New Password (leave blank to keep existing)"
                            : "Password"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Min. 6 characters"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator className="border-t-2 border-black" />

              {}
              <div className="space-y-3">
                <div>
                  <h4 className="text-base font-bold">Product Subscription</h4>
                  <p className="text-sm text-muted-foreground">
                    Link this client to the product they subscribe to, so paid
                    invoices automatically activate/renew their access there.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-black rounded-lg p-4">
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="nesthr">Nest HR</SelectItem>
                            <SelectItem value="nestleads">Nest Leads</SelectItem>
                            <SelectItem value="nestsports">Nest Sports</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {product !== "none" && (
                    <FormField
                      control={form.control}
                      name="externalTenantId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tenant / Company ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ID from the product's own database"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The Company ID (Nest HR) or Tenant ID (Nest Leads)
                            for this client in that product.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {product === "nestsports" && (
                  <div className="border-2 border-black rounded-lg p-4 space-y-3 bg-gray-50">
                    <button
                      type="button"
                      className="text-sm font-bold underline"
                      onClick={() => setShowNestSportsCreate((v) => !v)}
                    >
                      {showNestSportsCreate ? "Hide" : "Create a new NestSports subscription instead"}
                    </button>

                    {showNestSportsCreate && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-bold block mb-1">Owner Name</label>
                            <Input
                              placeholder={form.getValues("name") || "Defaults to client name"}
                              value={nsOwnerName}
                              onChange={(e) => setNsOwnerName(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-bold block mb-1">Owner Email</label>
                            <Input
                              type="email"
                              placeholder={form.getValues("email") || "Defaults to client email"}
                              value={nsOwnerEmail}
                              onChange={(e) => setNsOwnerEmail(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-bold block mb-1">Student Count</label>
                            <Input
                              type="number"
                              min={1}
                              value={nsStudentCount}
                              onChange={(e) => setNsStudentCount(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-bold block mb-1">Employee Count</label>
                            <Input
                              type="number"
                              min={0}
                              value={nsEmployeeCount}
                              onChange={(e) => setNsEmployeeCount(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-bold block mb-1">Billing Cycle</label>
                            <Select
                              value={nsBillingCycle}
                              onValueChange={(v) => setNsBillingCycle(v as "monthly" | "yearly")}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-bold block mb-1">Offer Code (optional)</label>
                            <Input
                              placeholder="e.g. LAUNCH50"
                              value={nsOfferCode}
                              onChange={(e) => setNsOfferCode(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3 bg-white">
                          <div>
                            <div className="text-sm font-bold">WhatsApp Add-on</div>
                            <div className="text-xs text-muted-foreground">₹300/unit/year instead of ₹150/unit/year</div>
                          </div>
                          <Switch checked={nsWantsWhatsapp} onCheckedChange={setNsWantsWhatsapp} />
                        </div>

                        {nsError && (
                          <p className="text-sm font-bold text-destructive">{nsError}</p>
                        )}
                        {nsResult && (
                          <p className="text-sm font-bold text-green-700">
                            Subscription created — login emailed to {nsResult.ownerEmail}. Amount ₹
                            {nsResult.amount}, renews {new Date(nsResult.renewalDate).toLocaleDateString()}.
                          </p>
                        )}

                        <Button
                          type="button"
                          size="sm"
                          disabled={nsCreating}
                          onClick={handleCreateNestSportsSubscription}
                          className="border-2 border-black font-bold"
                        >
                          {nsCreating && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
                          Create Subscription
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Separator className="border-t-2 border-black" />

              {}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasGst"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Has GST</FormLabel>
                        <FormDescription>
                          Does this client have a GST registration?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {hasGst && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4">
                    <FormField
                      control={form.control}
                      name="gstCompanyName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>GST Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gstNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gstAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" size="lg" className="text-lg w-full">
                {initialValues ? "Save Changes" : "Create Client"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
