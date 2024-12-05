import LayoutDashboard from '@/app/layout-dashboard'
import React from 'react'
import InstructorManagement from '../components/instructor'

export default function page() {
  return (
    <LayoutDashboard>

    <InstructorManagement />
    </LayoutDashboard>
  )
}
