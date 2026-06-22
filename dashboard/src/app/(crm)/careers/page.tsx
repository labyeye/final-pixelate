"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Plus, Briefcase, Users, Eye, Edit, Trash2, CheckCircle2, FileText } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SuccessModal } from "@/components/ui/success-modal";
import { useToast } from "@/hooks/use-toast";

interface JobPosting {
  _id: string;
  title: string;
  imageUrl?: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salaryType: "paid" | "unpaid";
  salary?: string;
  duration: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  tags: string[];
  status: "active" | "closed";
  applicationsCount?: number;
  createdAt: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "active" | "closed">("all");
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await apiFetch("/api/careers");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job posting?"))
      return;

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await apiFetch(`/api/careers/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Delete Failed",
          description: data.error || "Unknown error",
          variant: "destructive",
        });
        return;
      }

      setJobs(jobs.filter((job) => job._id !== id));
      showSuccess("Job posting deleted!");
      toast({
        title: "Job Deleted",
        description: "Job posting has been removed.",
      });
    } catch (error) {
      console.error("Error deleting job:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    return job.status === filter;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    closed: jobs.filter((j) => j.status === "closed").length,
    totalApplications: jobs.reduce(
      (sum, j) => sum + (j.applicationsCount || 0),
      0,
    ),
  };

  return (
    <div className="space-y-6">
      {successMessage && <SuccessModal message={successMessage} />}
      {}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Careers Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage job postings and track applications
          </p>
        </div>
        <Link href="/careers/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Job Posting
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="TOTAL JOBS" value={stats.total} sub="all postings" iconVariant="primary" />
        <StatCard icon={CheckCircle2} label="ACTIVE" value={stats.active} sub="open roles" iconVariant="secondary" />
        <StatCard icon={Eye} label="CLOSED" value={stats.closed} sub="filled/closed" iconVariant="primary" />
        <StatCard icon={Users} label="APPLICATIONS" value={stats.totalApplications} sub="total received" iconVariant="secondary" />
      </div>

      {}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All Jobs
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "closed" ? "default" : "outline"}
          onClick={() => setFilter("closed")}
        >
          Closed
        </Button>
      </div>

      {}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No job postings found
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first job posting
            </p>
            <Link href="/careers/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Job Posting
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <Card key={job._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {job.imageUrl ? (
                        <img
                          src={job.imageUrl}
                          alt={job.title}
                          className="w-12 h-12 rounded-md object-cover mr-2"
                        />
                      ) : null}
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          job.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <CardDescription className="flex flex-wrap gap-3 text-sm">
                      <span>📁 {job.department}</span>
                      <span>📍 {job.location}</span>
                      <span>⏰ {job.type}</span>
                      <span>💼 {job.experience}</span>
                      {job.salaryType && (
                        <span>
                          💰{" "}
                          {job.salaryType === "paid"
                            ? job.salary || "Paid"
                            : "Unpaid"}
                        </span>
                      )}
                      {job.duration && <span>📅 {job.duration}</span>}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/careers/${job._id}/applications`}>
                      <Button variant="outline" size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        {job.applicationsCount || 0}
                      </Button>
                    </Link>
                    <Link href={`/careers/edit/${job._id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteJob(job._id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {job.description.substring(0, 200)}...
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
