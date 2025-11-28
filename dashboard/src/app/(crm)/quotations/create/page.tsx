"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quotationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  date: z.string(),
  clientId: z.string().min(1, "Client is required"),
  objective: z.string().min(1, "Objective is required"),
  purpose: z.string().min(1, "Purpose is required"),
  scope: z.array(z.object({ value: z.string() })),
  deliverables: z.array(z.object({ value: z.string() })),
  timeline: z.array(
    z.object({
      phase: z.string(),
      description: z.string(),
      duration: z.string(),
    })
  ),
  lineItems: z.array(
    z.object({
      name: z.string(),
      qty: z.number(),
      unitPrice: z.number(),
      tax: z.number(),
      total: z.number(),
    })
  ),
  services: z.array(
    z.object({
      serviceName: z.string(),
      qty: z.number(),
      price: z.number(),
      total: z.number(),
    })
  ),
  modules: z.array(
    z.object({
      moduleName: z.string(),
      description: z.string(),
      status: z.enum(["Planned", "Ongoing", "Completed"]),
    })
  ),
  notes: z.string().optional(),
  paymentTerms: z.string().optional(),
});

type QuotationFormData = z.infer<typeof quotationSchema>;

export default function CreateQuotationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { toast } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      scope: [{ value: "" }],
      deliverables: [{ value: "" }],
      timeline: [{ phase: "", description: "", duration: "" }],
      lineItems: [{ name: "", qty: 1, unitPrice: 0, tax: 0, total: 0 }],
      services: [{ serviceName: "", qty: 1, price: 0, total: 0 }],
      modules: [{ moduleName: "", description: "", status: "Planned" }],
    },
  });

  const {
    fields: scopeFields,
    append: appendScope,
    remove: removeScope,
  } = useFieldArray({
    control,
    name: "scope",
  });

  const {
    fields: deliverableFields,
    append: appendDeliverable,
    remove: removeDeliverable,
  } = useFieldArray({
    control,
    name: "deliverables",
  });

  const {
    fields: timelineFields,
    append: appendTimeline,
    remove: removeTimeline,
  } = useFieldArray({
    control,
    name: "timeline",
  });

  const {
    fields: lineItemFields,
    append: appendLineItem,
    remove: removeLineItem,
  } = useFieldArray({
    control,
    name: "lineItems",
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "services",
  });

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  });

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (!editId) return;
    
    (async () => {
      try {
        const res = await fetch(`/api/quotations/${editId}`);
        if (!res.ok) throw new Error("Failed to fetch quotation");
        const quotation = await res.json();
        
        setIsEditMode(true);
        setValue("title", quotation.title || "");
        setValue("subtitle", quotation.subtitle || "");
        setValue("date", quotation.date?.split("T")[0] || new Date().toISOString().split("T")[0]);
        setValue("clientId", quotation.clientId || "");
        setValue("objective", quotation.objective || "");
        setValue("purpose", quotation.purpose || "");
        setValue("notes", quotation.notes || "");
        setValue("paymentTerms", quotation.paymentTerms || "");
        
        if (quotation.scope && quotation.scope.length > 0) {
          setValue("scope", quotation.scope.map((s: string) => ({ value: s })));
        }
        
        if (quotation.deliverables && quotation.deliverables.length > 0) {
          setValue("deliverables", quotation.deliverables.map((d: string) => ({ value: d })));
        }
        
        if (quotation.timeline && quotation.timeline.length > 0) {
          setValue("timeline", quotation.timeline);
        }
        
        if (quotation.lineItems && quotation.lineItems.length > 0) {
          setValue("lineItems", quotation.lineItems);
        }
        
        if (quotation.services && quotation.services.length > 0) {
          setValue("services", quotation.services);
        }
        
        if (quotation.modules && quotation.modules.length > 0) {
          setValue("modules", quotation.modules);
        }
      } catch (error: any) {
        console.error("Error loading quotation:", error);
        toast({
          title: "Error",
          description: "Failed to load quotation for editing",
          variant: "destructive",
        });
      }
    })();
  }, [editId, setValue, toast]);

  // Auto-calculate line item totals
  const watchLineItems = watch("lineItems");
  useEffect(() => {
    watchLineItems.forEach((item, idx) => {
      const total = item.qty * item.unitPrice * (1 + item.tax / 100);
      if (total !== item.total) {
        setValue(`lineItems.${idx}.total`, total);
      }
    });
  }, [watchLineItems, setValue]);

  // Auto-calculate service totals
  const watchServices = watch("services");
  useEffect(() => {
    watchServices.forEach((item, idx) => {
      const total = item.qty * item.price;
      if (total !== item.total) {
        setValue(`services.${idx}.total`, total);
      }
    });
  }, [watchServices, setValue]);

  const onSubmit = async (data: QuotationFormData) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        scope: data.scope.map((s) => s.value).filter(Boolean),
        deliverables: data.deliverables.map((d) => d.value).filter(Boolean),
        status: "DRAFT",
      };

      if (isEditMode && editId) {
        const res = await fetch(`/api/quotations/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to update quotation");

        const updated = await res.json();
        toast({
          title: "Success",
          description: "Quotation updated successfully",
        });
        router.push(`/quotations/${updated._id || updated.id || editId}/view`);
      } else {
        const res = await fetch("/api/quotations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to create quotation");

        const created = await res.json();
        toast({
          title: "Success",
          description: "Quotation created successfully",
        });
        router.push(`/quotations/${created._id || created.id}/view`);
      }
    } catch (error: any) {
      console.error("Error saving quotation:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create quotation",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6 font-headline">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Create Quotation
          </h1>
          <p className="text-muted-foreground mt-1">
            Build a professional proposal
          </p>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={saving} size="lg">
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Quotation"}
        </Button>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Proposal Details */}
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>Proposal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Proposal Title *</label>
              <Input
                {...register("title")}
                placeholder="e.g., Website Development for Acme Corp — Modern responsive site"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-semibold">
                Subtitle / Tagline
              </label>
              <Input
                {...register("subtitle")}
                placeholder="Optional: short tagline or project summary (e.g., Improve conversion rate)"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">Proposal Date *</label>
                <Input type="date" {...register("date")} />
              </div>
              <div>
                <label className="text-sm font-semibold">Client *</label>
                <select
                  {...register("clientId")}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">
                    Select client (or create new client in Clients) ...
                  </option>
                  {clients.map((c) => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.clientId && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.clientId.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Section */}
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Objective *</label>
              <Textarea
                {...register("objective")}
                rows={3}
                placeholder="Describe the primary objective (e.g., Increase leads by 30%, launch product landing page)
Examples: Improve conversion, migrate to headless CMS, launch e-commerce feature"
              />
              {errors.objective && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.objective.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-semibold">Purpose *</label>
              <Textarea
                {...register("purpose")}
                rows={3}
                placeholder="Explain the business purpose and expected outcome (e.g., modernize brand presence, reduce maintenance cost)"
              />
              {errors.purpose && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.purpose.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Scope */}
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Scope of Work</CardTitle>
            <Button
              type="button"
              size="sm"
              onClick={() => appendScope({ value: "" })}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-12 gap-2 items-center text-sm font-medium text-gray-600 mb-2">
              <div className="col-span-11">Scope Item</div>
              <div className="col-span-1 text-center">Action</div>
            </div>
            {scopeFields.map((field, idx) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`scope.${idx}.value`)}
                  placeholder="e.g., Design homepage; Implement CMS; Integrate payment gateway"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeScope(idx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Deliverables */}
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Deliverables</CardTitle>
            <Button
              type="button"
              size="sm"
              onClick={() => appendDeliverable({ value: "" })}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-12 gap-2 items-center text-sm font-medium text-gray-600 mb-2">
              <div className="col-span-11">Deliverable</div>
              <div className="col-span-1 text-center">Action</div>
            </div>
            {deliverableFields.map((field, idx) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`deliverables.${idx}.value`)}
                  placeholder="e.g., Responsive website, Admin dashboard, Deployment to production"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDeliverable(idx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Project Timeline</CardTitle>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                appendTimeline({ phase: "", description: "", duration: "" })
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {timelineFields.map((field, idx) => (
              <div
                key={field.id}
                className="grid grid-cols-12 gap-2 items-start"
              >
                <Input
                  {...register(`timeline.${idx}.phase`)}
                  placeholder="e.g., Discovery, Design, Development"
                  className="col-span-3"
                />
                <Input
                  {...register(`timeline.${idx}.description`)}
                  placeholder="Brief description of this phase (responsibilities & output)"
                  className="col-span-6"
                />
                <Input
                  {...register(`timeline.${idx}.duration`)}
                  placeholder="e.g., 2 weeks, 1 month"
                  className="col-span-2"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTimeline(idx)}
                  className="col-span-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Services Breakdown</CardTitle>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                appendService({ serviceName: "", qty: 1, price: 0, total: 0 })
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-12 gap-2 items-center text-sm font-medium text-gray-600 mb-2">
              <div className="col-span-5">Service</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right pr-2">Unit Price</div>
              <div className="col-span-2 text-right pr-2">Total</div>
              <div className="col-span-1 text-center">Action</div>
            </div>
            {serviceFields.map((field, idx) => (
              <div
                key={field.id}
                className="grid grid-cols-12 gap-2 items-start"
              >
                <Input
                  {...register(`services.${idx}.serviceName`)}
                  placeholder="e.g., Frontend Development, SEO Audit"
                  className="col-span-5"
                />
                <Input
                  type="number"
                  {...register(`services.${idx}.qty`, { valueAsNumber: true })}
                  placeholder="Qty (hours/units)"
                  className="col-span-2"
                />
                <Input
                  type="number"
                  {...register(`services.${idx}.price`, {
                    valueAsNumber: true,
                  })}
                  placeholder="Unit price (INR)"
                  className="col-span-2"
                />
                <Input
                  value={watchServices[idx]?.total.toFixed(2) || "0.00"}
                  readOnly
                  className="col-span-2 bg-gray-50"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeService(idx)}
                  className="col-span-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pricing Breakdown</CardTitle>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                appendLineItem({
                  name: "",
                  qty: 1,
                  unitPrice: 0,
                  tax: 0,
                  total: 0,
                })
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-12 gap-2 items-center text-sm font-medium text-gray-600 mb-2">
              <div className="col-span-4">Item / Description</div>
              <div className="col-span-1 text-center">Qty</div>
              <div className="col-span-2 text-right pr-2">Unit Price</div>
              <div className="col-span-1 text-center">Tax %</div>
              <div className="col-span-3 text-right pr-2">Total</div>
              <div className="col-span-1 text-center">Action</div>
            </div>
            {lineItemFields.map((field, idx) => (
              <div
                key={field.id}
                className="grid grid-cols-12 gap-2 items-start"
              >
                <Input
                  {...register(`lineItems.${idx}.name`)}
                  placeholder="e.g., UI Design (40 hours)"
                  className="col-span-4"
                />
                <Input
                  type="number"
                  {...register(`lineItems.${idx}.qty`, { valueAsNumber: true })}
                  placeholder="Qty (e.g., 40)"
                  className="col-span-1"
                />
                <Input
                  type="number"
                  {...register(`lineItems.${idx}.unitPrice`, {
                    valueAsNumber: true,
                  })}
                  placeholder="Unit price (e.g., 500)"
                  className="col-span-2"
                />
                <Input
                  type="number"
                  {...register(`lineItems.${idx}.tax`, { valueAsNumber: true })}
                  placeholder="Tax % (e.g., 18)"
                  className="col-span-1"
                />
                <Input
                  value={watchLineItems[idx]?.total.toFixed(2) || "0.00"}
                  readOnly
                  className="col-span-3 bg-gray-50"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLineItem(idx)}
                  className="col-span-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Modules */}
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Modules & Features</CardTitle>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                appendModule({
                  moduleName: "",
                  description: "",
                  status: "Planned",
                })
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-12 gap-2 items-center text-sm font-medium text-gray-600 mb-2">
              <div className="col-span-4">Module</div>
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-1 text-center">Action</div>
            </div>
            {moduleFields.map((field, idx) => (
              <div
                key={field.id}
                className="grid grid-cols-12 gap-2 items-start"
              >
                <Input
                  {...register(`modules.${idx}.moduleName`)}
                  placeholder="e.g., Blog Module, E-commerce Cart"
                  className="col-span-4"
                />
                <Input
                  {...register(`modules.${idx}.description`)}
                  placeholder="Short description or responsibilities for this module"
                  className="col-span-5"
                />
                <select
                  {...register(`modules.${idx}.status`)}
                  className="col-span-2 border rounded px-2 py-2"
                >
                  <option value="Planned">Planned</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeModule(idx)}
                  className="col-span-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Notes</label>
              <Textarea
                {...register("notes")}
                rows={3}
                placeholder="Additional notes for the client, assumptions, or exclusions"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Payment Terms</label>
              <Textarea
                {...register("paymentTerms")}
                rows={2}
                placeholder="e.g., 50% advance, 30% on milestone, 20% on delivery. Include invoice schedule and payment methods."
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving} size="lg">
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Creating..." : "Create Quotation"}
          </Button>
        </div>
      </form>
    </div>
  );
}
