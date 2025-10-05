'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type BlogPost = {
  id: number
  title: string
  category?: string
  excerpt?: string
  content?: string
  image?: string
  createdAt: string
}

export default function BlogsAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [excerpt, setExcerpt] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<string>('')
  const [importText, setImportText] = useState<string>('')

  useEffect(()=>{
    const raw = localStorage.getItem('pn_posts')
    if(raw){
      try { setPosts(JSON.parse(raw)) } catch(e){}
    }
  },[])

  function persist(p: BlogPost[]) {
    localStorage.setItem('pn_posts', JSON.stringify(p))
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onload = () => setImagePreview(String(r.result))
    r.readAsDataURL(f)
  }

  async function addPost() {
    if (!title) return alert('title required')
    const newPost: BlogPost = {
      id: Date.now(),
      title,
      category,
      excerpt,
      content,
      image: imagePreview,
      createdAt: new Date().toISOString(),
    }

    // try to POST to server API first (dashboard dev server runs on 9002)
    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'https://pixelatenest-crm.vercel.app' : '';
    try {
      const res = await fetch(API_BASE + '/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      })
      if (res.ok) {
        const saved = await res.json()
        // server returns the saved object (may include _id); keep our id for compatibility
        const toUse = { ...newPost, ...saved }
        const p = [toUse, ...posts]
        setPosts(p)
        persist(p)
        setTitle('')
        setCategory('')
        setExcerpt('')
        setContent('')
        setImagePreview('')
        return
      }
    } catch (e) {
      // ignore and fallback to localStorage below
    }

    // fallback: persist to localStorage so website can still show the post locally
    const p = [newPost, ...posts]
    setPosts(p)
    persist(p)
    setTitle('')
    setCategory('')
    setExcerpt('')
    setContent('')
    setImagePreview('')
    alert('Saved locally (server unreachable).')
  }

  function removePost(id: number) {
    ;(async () => {
      const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'https://pixelatenest-crm.vercel.app' : '';
      try {
        // try to delete from server by numeric id or _id if present
        const res = await fetch(`${API_BASE}/api/blogs/${id}`, { method: 'DELETE' })
        if (res.ok) {
          const p = posts.filter((x) => x.id !== id)
          setPosts(p)
          persist(p)
          return
        }
      } catch (e) {
        // ignore and fallback to local delete
      }

      // fallback to local removal
      const p = posts.filter((x) => x.id !== id)
      setPosts(p)
      persist(p)
    })()
  }

  // Publish posts from localStorage to server API
  async function publishLocalPosts() {
    const raw = localStorage.getItem('pn_posts')
    if (!raw) return alert('No local posts found')
    let local: BlogPost[] = []
    try {
      local = JSON.parse(raw)
    } catch (e) {
      return alert('Invalid local posts JSON')
    }
    if (!local.length) return alert('No local posts to publish')

    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'https://pixelatenest-crm.vercel.app' : '';
    const published: BlogPost[] = [...posts]
    for (const post of local) {
      try {
        const res = await fetch(API_BASE + '/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post),
        })
        if (res.ok) {
          const saved = await res.json()
          published.unshift({ ...post, ...saved })
        } else {
          // keep locally if server fails for this post
          published.unshift(post)
        }
      } catch (e) {
        published.unshift(post)
      }
    }
    setPosts(published)
    persist(published)
    alert('Publish attempt finished. Check public site or API to confirm.')
  }

  // Import JSON text (from paste) and publish each entry
  async function importJsonAndPublish() {
    if (!importText) return alert('Paste JSON into the import box first')
    let parsed: BlogPost[] | BlogPost
    try {
      parsed = JSON.parse(importText)
    } catch (e) {
      return alert('Invalid JSON')
    }
    const arr: BlogPost[] = Array.isArray(parsed) ? parsed : [parsed]
    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'https://pixelatenest-crm.vercel.app' : '';
    const published: BlogPost[] = [...posts]
    for (const post of arr) {
      try {
        const res = await fetch(API_BASE + '/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post),
        })
        if (res.ok) {
          const saved = await res.json()
          published.unshift({ ...post, ...saved })
        } else {
          published.unshift(post)
        }
      } catch (e) {
        published.unshift(post)
      }
    }
    setPosts(published)
    persist(published)
    setImportText('')
    alert('Import finished. Check public site or API to confirm.')
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Blogs Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-4">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-3 rounded-md bg-background border" />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" className="p-3 rounded-md bg-background border" />
            <input type="file" onChange={handleFile} className="p-3 rounded-md bg-background border" />
          </div>
          <div className="mb-4">
            <textarea value={excerpt} onChange={e=>setExcerpt(e.target.value)} placeholder="Excerpt" className="w-full p-3 rounded-md bg-background border" rows={3} />
          </div>
          <div className="mb-4">
            <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content (HTML allowed)" className="w-full p-3 rounded-md bg-background border" rows={8} />
          </div>
          <div className="flex gap-3">
            <Button onClick={addPost}>Add Post</Button>
          </div>
        </div>
        <aside className="p-4 bg-muted rounded-md">
          <h3 className="font-bold mb-2">Preview</h3>
          {imagePreview ? <img src={imagePreview} alt="preview" className="w-full mb-2" /> : <div className="mb-2 text-sm text-muted">No image</div> }
          <div className="font-bold">{title || 'Title goes here'}</div>
          <div className="text-sm text-muted mb-2">{category}</div>
          <div className="text-sm">{excerpt}</div>
        </aside>
      </div>

      <div className="mt-8">
        <h3 className="font-bold mb-2">Existing Posts</h3>
        <div className="space-y-2">
          {posts.map((p: BlogPost) => (
            <div key={p.id} className="p-3 bg-background rounded-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={p.image || '/favicon.ico'} alt="" className="w-16 h-12 object-cover" />
                <div>
                  <div className="font-bold">{p.title}</div>
                  <div className="text-sm text-muted">{p.category} · {new Date(p.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(p)); alert('Copied post JSON to clipboard') }}>Copy JSON</Button>
                <Button onClick={() => removePost(p.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-bold mb-2">Publish / Import</h3>
        <div className="mb-4">
          <button className="mr-2" onClick={publishLocalPosts}>Publish Local Posts to Server</button>
          <span className="text-sm text-muted">(Attempts to POST any localStorage posts to the dashboard API)</span>
        </div>
        <div className="mb-4">
          <textarea value={importText} onChange={e=>setImportText(e.target.value)} placeholder='Paste post JSON or an array of posts here' className="w-full p-3 rounded-md bg-background border" rows={6} />
        </div>
        <div>
          <button onClick={importJsonAndPublish}>Import & Publish</button>
        </div>
      </div>
    </div>
  )
}
