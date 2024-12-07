import Dashboard from "@/components/dashboard";
import { ModeToggle } from "@/components/mode-toggle";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import HeaderNav from "@/components/Sidebar/header";
import Navbar from "@/components/Sidebar/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import MemberManagement from "./(dashboard)/components/Gestion";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <HeaderNav />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50">
              <Dashboard  />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          <MemberManagement />

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
