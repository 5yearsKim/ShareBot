import React, { ReactNode } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { GroupProvider } from "@/components/$providers/GroupProvider";
import { MeProvider } from "@/components/$providers/MeProvider";
import { NavbarLayout } from "@/components/$layouts/NavbarLayout";
import { GroupNavbar } from "@/components/GroupNavbar";
import { GroupDrawer } from "@/components/GroupDrawer";
import { NAV_HEIGHT } from "@/ui/global";


type GroupLayoutProps = {
  children: ReactNode;
  params: {groupKey: string};
}

export default function GroupLayout({
  children,
  params: { groupKey },
}: GroupLayoutProps): ReactNode {
  return (
    <GroupProvider groupKey={groupKey}>
      <MeProvider>
        <NavbarLayout
          navbar={<GroupNavbar />}
          height={NAV_HEIGHT}
        >
          <GroupDrawer/>
          {children}
        </NavbarLayout>
      </MeProvider>
    </GroupProvider>
  );
}