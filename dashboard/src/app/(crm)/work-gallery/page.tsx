"use client";

import { useEffect, useState } from "react";
import { useAuth } from '@/hooks/use-auth'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(1),
  link: z.string().url().or(z.string().min(0)),
  tech: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  showOn: z.enum(["web-development","software-development","app-development","video-editing","none"]),
  thumbnailBase64: z.string().optional(),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function WorkGalleryPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const form = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues: { title: "", link: "", tech: "", rating: 0, showOn: "none" } });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/work-gallery');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        if (mounted) setItems(json || []);
      } catch (e) {
        console.error('Failed to load gallery', e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const onFile = async (f: File | null) => {
    if (!f) return null;
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = { ...values } as any;
      if (editingId) {
        // update
        const res = await fetch(`/api/work-gallery/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('Failed to update');
        const updated = await res.json();
        setItems(prev => prev.map(i => (String(i._id ?? i.id) === String(editingId) ? updated : i)));
        setEditingId(null);
        form.reset();
      } else {
        const res = await fetch('/api/work-gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error('Failed to save');
        const created = await res.json();
        setItems(prev => [...prev, created]);
        form.reset();
      }
    } catch (e) {
      console.error('Failed to save gallery item', e);
    }
  };

  // handle file input separately to attach base64 into form
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    const data = f ? await onFile(f) : null;
    form.setValue('thumbnailBase64', data || '');
  };

  const deleteItem = async (id: string) => {
    try {
      if (!confirm('Delete this gallery item?')) return;
      const res = await fetch(`/api/work-gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems(prev => prev.filter(x => String(x._id ?? x.id) !== String(id)));
    } catch (e) {
      console.error('Failed to delete', e);
    }
  };

  const startEdit = (it: any) => {
    setEditingId(String(it._id ?? it.id));
    // populate form
    form.reset({
      title: it.title || '',
      link: it.link || '',
      tech: it.tech || '',
      rating: Number(it.rating ?? 0),
      showOn: it.showOn || 'none',
      thumbnailBase64: it.thumbnailBase64 || '',
      note: it.note || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    form.reset();
  };

  return (
    <div className="space-y-8 font-headline">
      <header>
        <h1 className="text-5xl font-black tracking-tighter">Work Gallery Management</h1>
        <p className="text-muted-foreground text-lg">Upload project thumbnails and metadata. Choose where to show each item on the public website.</p>
      </header>

      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Gallery Item' : 'Add Gallery Item'}</CardTitle>
          <CardDescription>Thumbnail, title, link, tech tags and rating</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit((v) => onSubmit(v))} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <Input {...form.register('title')} />
              </div>
              <div>
                <label className="block text-sm font-medium">Project Link (optional)</label>
                <Input {...form.register('link')} />
              </div>
              <div>
                <label className="block text-sm font-medium">Tech / Tags (comma separated)</label>
                <Input {...form.register('tech')} />
              </div>
              <div>
                <label className="block text-sm font-medium">Rating (0-5)</label>
                <Input type="number" min={0} max={5} {...form.register('rating', { valueAsNumber: true })} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Show on</label>
              <select {...form.register('showOn')} className="w-full border rounded px-2 py-1">
                <option value="none">Do not display</option>
                <option value="web-development">Web Development</option>
                <option value="software-development">Software Development</option>
                <option value="app-development">App Development</option>
                <option value="video-editing">Video Editing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Thumbnail</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <div>
              <label className="block text-sm font-medium">Note</label>
              <Textarea {...form.register('note')} />
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Update' : 'Save'}</Button>
              <Button variant="ghost" onClick={() => editingId ? cancelEdit() : form.reset()}>{editingId ? 'Cancel' : 'Reset'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="border-2 border-black">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tech</TableHead>
              <TableHead className="text-right">Rating</TableHead>
              <TableHead>Show On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((it) => (
              <TableRow key={it._id ?? it.id}>
                <TableCell>
                  {it.thumbnailBase64 ? (
                    <img src={it.thumbnailBase64} alt={it.title} style={{ width: 80, height: 60, objectFit: 'cover' }} />
                  ) : (
                    <div className="w-20 h-12 bg-gray-100 flex items-center justify-center">No image</div>
                  )}
                </TableCell>
                <TableCell className="font-bold">{it.title}</TableCell>
                <TableCell>{it.tech}</TableCell>
                <TableCell className="text-right">{it.rating ?? '-'}</TableCell>
                <TableCell>{it.showOn ?? 'none'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => window.open(it.link || '#', '_blank')}>Open</Button>
                    <Button size="sm" onClick={() => startEdit(it)}>Edit</Button>
                    {isAdmin ? <Button size="sm" variant="destructive" onClick={() => deleteItem(String(it._id ?? it.id))}>Delete</Button> : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
