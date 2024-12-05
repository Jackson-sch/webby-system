import { AppSidebar } from '@/components/Sidebar/app-sidebar'
import HeaderNav from '@/components/Sidebar/header'
import Navbar from '@/components/Sidebar/navbar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

export default function LayoutDashboard({children}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <HeaderNav />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
