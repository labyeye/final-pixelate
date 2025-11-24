"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Photo = { _id?: string; thumbnailBase64?: string; link?: string; title?: string };
type FormValues = { title?: string; link?: string };

export default function PhotoGalleriesPage() {
  const [items, setItems] = useState<Photo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({ defaultValues: { title: '', link: '' } });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/photos');
        if (!res.ok) throw new Error('Failed to fetch photos');
        const json = await res.json();
        if (mounted) setItems(json || []);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const toBase64 = (f: File | null) => {
    if (!f) return Promise.resolve<string>('');
    return new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(f);
    });
  };

  // upload multiple files, create separate photo docs
  const onAddFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const perFileMax = 8 * 1024 * 1024; // 8MB
    const created: Photo[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const f = files[i];
        if (!f.type.startsWith('image/')) { alert(`Skipped ${f.name}: not an image`); continue; }
        if (f.size > perFileMax) { alert(`Skipped ${f.name}: file too large`); continue; }
        const data = await toBase64(f);
        const res = await fetch('/api/photos', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ thumbnailBase64: data, title: f.name || '', link: '' })
        });
        if (!res.ok) { console.warn('Failed to save', await res.text()); continue; }
        const json = await res.json(); created.push(json);
      } catch (e) { console.error(e); }
    }
    if (created.length) setItems(prev => [...created, ...prev]);
  };

  const onReplaceImage = async (id: string, f: File | null) => {
    if (!f) return;
    const data = await toBase64(f);
    try {
      const res = await fetch(`/api/photos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ thumbnailBase64: data }) });
      if (!res.ok) throw new Error('Replace failed');
      const updated = await res.json();
      setItems(prev => prev.map(p => String(p._id) === String(id) ? updated : p));
    } catch (e) { console.error(e); }
  };

  const onSubmit = async (v: FormValues) => {
    try {
      if (editingId) {
        const res = await fetch(`/api/photos/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
        if (!res.ok) throw new Error('Update failed');
        const updated = await res.json();
        setItems(prev => prev.map(p => String(p._id) === String(editingId) ? updated : p));
        setEditingId(null); reset();
      } else {
        const res = await fetch('/api/photos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
        if (!res.ok) throw new Error('Save failed');
        const created = await res.json(); setItems(prev => [created, ...prev]); reset();
      }
    } catch (e) { console.error(e); }
  };

  const startEdit = (p: Photo) => { setEditingId(String(p._id ?? p._id)); setValue('title', p.title || ''); setValue('link', p.link || ''); };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    try {
      const res = await fetch(`/api/photos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems(prev => prev.filter(x => String(x._id ?? x._id) !== String(id)));
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black">Photos</h1>
        <p className="text-muted-foreground">Upload photos — they will appear on the public Photography page as a flat list.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Photo' : 'Upload Photos'}</CardTitle>
          <CardDescription>{editingId ? 'Edit selected photo metadata' : 'Upload one or more photos. Each photo becomes a record.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Photos</label>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Upload multiple images at once. After upload you can edit title/link or replace the image.</p>
                <input type="file" accept="image/*" multiple onChange={async (e) => await onAddFiles(e.target.files)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Edit Selected</label>
              <div className="space-y-2">
                <Input {...register('title')} placeholder="Title (optional)" />
                <Input {...register('link')} placeholder="Link (optional)" className="mt-2" />
                <div className="mt-2">
                  <label className="text-sm">Replace Image</label>
                  <input type="file" accept="image/*" onChange={async (e) => { const f = e.target.files?.[0] ?? null; if (editingId && f) await onReplaceImage(editingId, f); }} />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
              <Button variant="ghost" onClick={() => { reset(); setEditingId(null); }}>Reset</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(it => (
          <div key={String(it._id ?? '')} className="border p-3 rounded">
            <div className="flex items-start gap-4">
              <div style={{ width: 160, height: 100, overflow: 'hidden', borderRadius: 8 }}>
                {it.thumbnailBase64 ? <img src={it.thumbnailBase64} alt={it.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div className="w-full h-full bg-gray-100" />}
              </div>
              <div className="flex-1">
                <div className="font-bold">{it.title || 'Untitled'}</div>
                <div className="text-sm text-muted-foreground">{it.link || ''}</div>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => startEdit(it)}>Edit</Button>
                  <Button variant="destructive" onClick={() => deleteItem(String(it._id ?? ''))}>Delete</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
