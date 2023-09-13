'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      Layout
      <Button onClick={() => signOut()}>登出</Button>
      <div>{children}</div>
    </div>
  )
}

export default Layout
