'use client';
import './globals.css'

import { QueryClientProvider, QueryClient } from 'react-query'
import { useState } from 'react';
export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
      <QueryClientProvider client={queryClient}>
        {children}        
      </QueryClientProvider>
      </body>
    </html>
  )
}
