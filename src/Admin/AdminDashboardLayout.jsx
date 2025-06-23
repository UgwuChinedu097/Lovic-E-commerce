import React, { useState } from "react"
import Sidebar from "./SideBar"
import AdminHeader from "./AdminHeader"
import { Outlet } from "react-router-dom"

export default function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <AdminHeader onSidebarToggle={() => setSidebarOpen(true)} />
          
        <main className="mt-16 p-4 overflow-y-auto h-full">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

