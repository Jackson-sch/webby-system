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
          <MemberManagement />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
