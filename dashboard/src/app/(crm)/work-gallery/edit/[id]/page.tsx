"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api-fetch";
import WorkGalleryForm, { WorkGalleryPayload } from "@/components/work-gallery/work-gallery-form";

export default function EditWorkPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData]       = useState<Partial<WorkGalleryPayload> | null>(null);
  const [error, setError]     = useState(false);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/api/work-gallery/${id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((json) => setData(json))
      .catch(() => setError(true));
  }, [id]);

  if (error) return (
    <div className="p-8 text-red-600 font-semibold">
      Could not load project. Check the ID and try again.
    </div>
  );

  if (!data) return (
    <div className="p-8 text-muted-foreground animate-pulse">Loading project…</div>
  );

  return <WorkGalleryForm mode="edit" initialData={data} itemId={id} />;
}
