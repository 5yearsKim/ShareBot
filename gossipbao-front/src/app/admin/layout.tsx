import React, { ReactNode } from "react";
import { AdminProvider } from "@/components/$providers/AdminProvider";
import { NavbarLayout } from "@/components/$layouts/NavbarLayout";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminDrawer } from "@/components/AdminDrawer";
import { NAV_HEIGHT } from "@/ui/global";


type AdminLayoutProps = {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps): ReactNode {
  return (
    <AdminProvider>
      <NavbarLayout
        navbar={<AdminNavbar />}
        height={NAV_HEIGHT}
      >
        <AdminDrawer/>
        {children}
      </NavbarLayout>
    </AdminProvider>
  );
}