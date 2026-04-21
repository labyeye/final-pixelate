"use client";

import React from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TeamMember } from "@/lib/data";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  // login fields requested: email, password, role (staff/admin)
  email: z.string().email({ message: "A valid email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .optional(),
  loginRole: z.union([z.literal("staff"), z.literal("admin")]).optional(),
  phone: z.string().min(10, { message: "A valid phone number is required." }),
  address: z.string().min(5, { message: "Address is required." }),
  // include founder roles and standard roles for display/position
  role: z.union([
    z.literal("Founder"),
    z.literal("Co-Founder"),
    z.literal("Web Developer"),
    z.literal("Editor"),
    z.literal("Designer"),
    z.literal("Project Manager"),
    z.literal("Lead Generator"),
  ]),
  pan: z.string().optional(),
  aadhar: z.string().optional(),
  secondaryPhone: z.string().optional(),
  secondaryEmail: z.string().email().optional().or(z.literal("")),
  salary: z.coerce.number().optional(),
  // Payment Account fields
  paymentAccountType: z.union([z.literal("UPI"), z.literal("Bank"), z.literal("None")]).optional(),
  upiId: z.string().optional(),
  bankAccountHolderName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankIfscCode: z.string().optional(),
  bankName: z.string().optional(),
});

type AddMemberDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  // allow onAddMember to return a Promise or sync value
  onAddMember?: (
    newMember: Omit<TeamMember, "id">,
  ) => void | Promise<void | TeamMember>;
  onCreated?: (created: any) => void;
  // Support edit mode
  onSave?: (
    id: string | number,
    update: Partial<TeamMember>,
  ) => void | Promise<void | TeamMember>;
  initialValues?: Partial<TeamMember>;
  children: React.ReactNode;
};

export function AddMemberDialog({
  isOpen,
  setIsOpen,
  onAddMember,
  onSave,
  initialValues,
  onCreated,
  children,
}: AddMemberDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      email: initialValues?.email ?? "",
      password: "",
      loginRole: "staff",
      phone: initialValues?.phone ?? "",
      address: initialValues?.address ?? "",
      role: initialValues?.role ?? "Web Developer",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.debug("AddMemberDialog onSubmit values:", values);
    // Build the team member payload
    const memberPayload: any = {
      name: values.name,
      email: values.email,
      password: values.password,
      loginRole: values.loginRole,
      phone: values.phone,
      address: values.address,
      role: values.role,
      pan: values.pan,
      aadhar: values.aadhar,
      secondaryPhone: values.secondaryPhone,
      secondaryEmail: values.secondaryEmail,
      salary: values.salary,
      // Payment Account fields
      paymentAccountType: values.paymentAccountType,
      upiId: values.upiId,
      bankAccountHolderName: values.bankAccountHolderName,
      bankAccountNumber: values.bankAccountNumber,
      bankIfscCode: values.bankIfscCode,
      bankName: values.bankName,
    };

    if (initialValues && (initialValues._id || initialValues.id)) {
      // Edit existing member
      const id = initialValues._id ?? initialValues.id;
      if (onSave) {
        try {
          // Normalize fields for update: keep job role (jobRole) separate from auth role (role)
          const updatePayload: any = { ...memberPayload };
          if (updatePayload.role) {
            updatePayload.jobRole = updatePayload.role;
            delete updatePayload.role;
          }
          if ((updatePayload as any).loginRole) {
            updatePayload.role = (updatePayload as any).loginRole;
            delete (updatePayload as any).loginRole;
          }
          await onSave(id as any, updatePayload as Partial<TeamMember>);
        } catch (e) {
          console.error("onSave failed", e);
          alert(
            "Failed to save team member: " + ((e as any)?.message || String(e)),
          );
          return;
        }
      }
    } else {
      // Create team member and optionally a login user record
      let createdMember: any = null;
      let parentCreated = false;
      if (onAddMember) {
        try {
          const maybe = await onAddMember(memberPayload);
          parentCreated = true;
          createdMember = maybe ?? null;
        } catch (e) {
          console.error("onAddMember failed", e);
          parentCreated = false;
          // fallthrough to fallback POST
        }
      }

      // Fallback: if parent didn't create or threw, call API directly to create a single user document
      if (!parentCreated) {
        try {
          const userBody: any = {
            ...memberPayload,
            jobRole: memberPayload.role,
            role: values.loginRole ?? "staff",
          };
          // include password if present so server can hash it
          if (values.password) userBody.password = values.password;
          delete userBody.role; // keep jobRole separately for display
          console.debug(
            "Posting consolidated userBody to /api/users",
            userBody,
          );
          const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(userBody),
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) {
            const body = await res.text();
            throw new Error(
              `Failed to create user/team member: ${res.status} ${body}`,
            );
          }
          createdMember = await res.json();
          if (onCreated) onCreated(createdMember);
        } catch (e) {
          console.error("Failed to create team member via API", e);
          alert(
            "Failed to create team member: " +
              ((e as any)?.message || String(e)),
          );
          return;
        }
      }
    }

    form.reset();
    setIsOpen(false);
  }

  // Reset form when editing an existing member
  React.useEffect(() => {
    if (initialValues) {
      form.reset({
        name: initialValues.name ?? "",
        email: initialValues.email ?? "",
        password: (initialValues as any).password ?? "",
        loginRole: (initialValues as any).loginRole ?? "staff",
        phone: initialValues.phone ?? "",
        address: initialValues.address ?? "",
        role: initialValues.role ?? "Web Developer",
        pan: initialValues.pan ?? undefined,
        aadhar: initialValues.aadhar ?? undefined,
        secondaryPhone: initialValues.secondaryPhone ?? undefined,
        secondaryEmail: initialValues.secondaryEmail ?? undefined,
        salary: initialValues.salary ?? undefined,
        // Payment Account fields
        paymentAccountType: (initialValues as any).paymentAccountType ?? undefined,
        upiId: (initialValues as any).upiId ?? undefined,
        bankAccountHolderName: (initialValues as any).bankAccountHolderName ?? undefined,
        bankAccountNumber: (initialValues as any).bankAccountNumber ?? undefined,
        bankIfscCode: (initialValues as any).bankIfscCode ?? undefined,
        bankName: (initialValues as any).bankName ?? undefined,
      });
    }
  }, [initialValues]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl font-black tracking-tighter">
            Add New Team Member
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the new developer, editor, or designer.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
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
                    <FormLabel>Primary Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Sign-in password and auth role for login-capable team members */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sign-in Password (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Set a password to allow sign-in"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loginRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auth Role</FormLabel>
                    <Select
                      value={field.value ?? "staff"}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select auth role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      value={field.value ?? "Web Developer"}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Founder">Founder</SelectItem>
                        <SelectItem value="Co-Founder">Co-Founder</SelectItem>
                        <SelectItem value="Web Developer">
                          Web Developer
                        </SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Designer">Designer</SelectItem>
                        <SelectItem value="Project Manager">
                          Project Manager
                        </SelectItem>
                        <SelectItem value="Lead Generator">
                          Lead Generator
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 50000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="ABCDE1234F" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aadhar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhar (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Email (Optional)</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Payment Account Section */}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Payment Account Details (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="paymentAccountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Account Type</FormLabel>
                      <Select
                        value={field.value ?? "None"}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="UPI">UPI</SelectItem>
                          <SelectItem value="Bank">Bank Account</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* UPI Fields */}
                {form.watch("paymentAccountType") === "UPI" && (
                  <FormField
                    control={form.control}
                    name="upiId"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>UPI ID</FormLabel>
                        <FormControl>
                          <Input placeholder="user@upi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Bank Account Fields */}
                {form.watch("paymentAccountType") === "Bank" && (
                  <>
                    <FormField
                      control={form.control}
                      name="bankAccountHolderName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankAccountNumber"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankIfscCode"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>IFSC Code</FormLabel>
                          <FormControl>
                            <Input placeholder="SBIN0001234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-3">
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="State Bank of India" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" size="lg" className="text-lg w-full mt-4">
                Create Team Member
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
