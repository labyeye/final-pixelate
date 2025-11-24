// Node script to POST a sample photo gallery to the deployed API.
// Usage: node scripts/create-sample-photo-gallery.js

const API = process.env.PHOTO_GALLERIES_API || 'https://pixelatenest-crm.vercel.app/api/photo-galleries'

// tiny 1x1 gif placeholder
const placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

const payload = {
  brandName: 'Sample Brand',
  brandLogoBase64: placeholder,
  entries: [
    { thumbnailBase64: placeholder, link: '', title: 'Sample Photo 1' },
    { thumbnailBase64: placeholder, link: '', title: 'Sample Photo 2' },
    { thumbnailBase64: placeholder, link: '', title: 'Sample Photo 3' }
  ]
}

async function run() {
  try {
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const text = await res.text()
    console.log('Status', res.status)
    console.log(text)
  } catch (e) {
    console.error('Request failed', e)
  }
}

run()
