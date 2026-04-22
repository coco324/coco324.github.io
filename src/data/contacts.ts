export interface Contact {
  label: string
  value: string
  href: string
  icon: string
}

export const contacts: Contact[] = [
  {
    label: 'Email',
    value: 'corantinantony63@gmail.com',
    href: 'mailto:corantinantony63@gmail.com',
    icon: '<svg width="28" height="28" fill="none" stroke="#2ecc71" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  },
  {
    label: 'GitHub',
    value: 'github.com/coco324',
    href: 'https://github.com/coco324',
    icon: '<svg width="28" height="28" fill="#2ecc71" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.57v-2.24c-3.02.55-3.8-.73-4.04-1.41-.13-.34-.72-1.41-1.23-1.7-.42-.22-1.02-.78-.01-.79.94-.01 1.62.87 1.84 1.23 1.08 1.82 2.81 1.31 3.5.99.1-.78.42-1.31.76-1.61-2.67-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1-.31 3.3 1.23a11.5 11.5 0 016 0c2.3-1.54 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.76.84 1.23 1.9 1.23 3.22 0 4.6-2.81 5.62-5.48 5.92.44.38.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A12.02 12.02 0 0024 12C24 5.37 18.63 0 12 0z"/></svg>',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/corantin-antony/',
    href: 'https://www.linkedin.com/in/corantin-antony/',
    icon: '<svg width="28" height="28" fill="#2ecc71" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  },
]
