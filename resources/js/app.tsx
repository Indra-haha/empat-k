/// <reference types="vite/client" />

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    
    // ubah dot notation menjadi folder path
    const path = name.replace(/\./g, '/')

    const page = pages[`./Pages/${path}.tsx`]

    if (!page) {
      console.error('Available pages:', Object.keys(pages))
      throw new Error(`Page not found: ./Pages/${path}.tsx`)
    }

    return page
  },
  setup({ el, App, props }) {
    if (!el) throw new Error('React root element not found')
    createRoot(el).render(<App {...props} />)
  },
})