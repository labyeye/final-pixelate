"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type Entry = { thumbnailBase64?: string; link?: string; title?: string }
type FormValues = { brandName: string; brandLogoBase64?: string; entries: Entry[] }

export default function ReelsPage() {
  const [items, setItems] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const { register, control, handleSubmit, reset, setValue, getValues } = useForm<FormValues>({ defaultValues: { brandName: '', brandLogoBase64: '', entries: [] } })
  const { fields, append, remove, replace } = useFieldArray({ control, name: 'entries' })

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/reels')
        if (!res.ok) throw new Error('Failed to fetch reels')
        const json = await res.json()
        if (mounted) setItems(json || [])
      } catch (e) {
        console.error(e)
      }
    })()
    return () => { mounted = false }
  }, [])

  const toBase64 = (f: File | null) => {
    if (!f) return Promise.resolve<string>('')
    return new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(f);
    })
  }

  const onBrandLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    const data = await toBase64(f)
    setValue('brandLogoBase64', data)
  }

  const onEntryFile = async (index: number, f: File | null) => {
    const data = f ? await toBase64(f) : ''
    // Use getValues to obtain current entries safely, then replace the array
    const current = getValues().entries || []
    const entriesCopy = [...current]
    // ensure length
    while (entriesCopy.length <= index) entriesCopy.push({ thumbnailBase64: '', link: '', title: '' })
    entriesCopy[index] = { ...(entriesCopy[index] || {}), thumbnailBase64: data }
    replace(entriesCopy)
  }

  const onSubmit = async (v: FormValues) => {
    try {
      if (editingId) {
        const res = await fetch(`/api/reels/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) })
        if (!res.ok) throw new Error('Update failed')
        const updated = await res.json()
        setItems(prev => prev.map(i => (String(i._id ?? i.id) === String(editingId) ? updated : i)))
        setEditingId(null)
        reset()
      } else {
        const res = await fetch('/api/reels', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) })
        if (!res.ok) throw new Error('Save failed')
        const created = await res.json()
        setItems(prev => [created, ...prev])
        reset()
      }
    } catch (e) {
      console.error('Failed to save reel', e)
    }
  }

  const startEdit = (it: any) => {
    setEditingId(String(it._id ?? it.id))
    reset({ brandName: it.brandName || '', brandLogoBase64: it.brandLogoBase64 || '', entries: it.entries || [] })
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this reel?')) return
    try {
      const res = await fetch(`/api/reels/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setItems(prev => prev.filter(x => String(x._id ?? x.id) !== String(id)))
    } catch (e) { console.error(e) }
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black">Reels Management</h1>
        <p className="text-muted-foreground">Upload a brand logo and multiple reel thumbnails with links. These will appear on the Video Editing page.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Reel' : 'Add Reel'}</CardTitle>
          <CardDescription>Brand logo + list of thumbnails and links</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Brand Name</label>
              <Input {...register('brandName')} />
            </div>
            <div>
              <label className="block text-sm font-medium">Brand Logo</label>
              <input type="file" accept="image/*" onChange={onBrandLogo} />
            </div>

            <div>
              <label className="block text-sm font-medium">Thumbnails (reels)</label>
              <div className="space-y-2">
                {fields.map((f, idx) => (
                  <div key={f.id} className="grid grid-cols-3 gap-2 items-center">
                    <input type="file" accept="image/*" onChange={async (e) => await onEntryFile(idx, e.target.files?.[0] ?? null)} />
                    <Input {...register(`entries.${idx}.link` as const)} placeholder="Link" />
                    <Input {...register(`entries.${idx}.title` as const)} placeholder="Title (optional)" />
                    <div className="col-span-3">
                      <Button variant="destructive" onClick={() => remove(idx)}>Remove</Button>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={() => append({ thumbnailBase64: '', link: '', title: '' })}>Add thumbnail</Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Update' : 'Save'}</Button>
              <Button variant="ghost" onClick={() => { reset(); setEditingId(null) }}>Reset</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {items.map(it => (
          <div key={String(it._id ?? it.id)} className="border p-4 rounded">
            <div className="flex items-center gap-4">
              {it.brandLogoBase64 ? <img src={it.brandLogoBase64} alt={it.brandName} style={{ width: 80, height: 40, objectFit: 'contain' }} /> : <div className="w-20 h-10 bg-gray-100" />}
              <div className="flex-1">
                <div className="font-bold">{it.brandName}</div>
                <div className="text-sm text-muted-foreground">{(it.entries||[]).length} thumbnails</div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => startEdit(it)}>Edit</Button>
                <Button variant="destructive" onClick={() => deleteItem(String(it._id ?? it.id))}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
