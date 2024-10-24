"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useNavbarDrawer } from "@/hooks/NavbarDrawer";
import {
  List, ListItemButton, ListItemIcon, ListItemText,
} from "@mui/material";
import { MDrawer } from "@/components/GroupDrawer";
import { NAV_HEIGHT } from "@/ui/global";
import { Col } from "@/ui/layouts";
import {HomeIcon} from '@/ui/icons'
import P from "path";

export function AdminDrawer(): JSX.Element {
  const router = useRouter();
  const { adminOpen, closeDrawer } = useNavbarDrawer();

  function handleClose(): void {
    closeDrawer();
  }

  function handleNavigateTo(to: string): void {
    closeDrawer();
    router.replace(P.join("/admin", to));
  }

  return (
    <MDrawer isOpen={adminOpen} onClose={handleClose}>
      <Col minHeight={`calc(100vh - ${NAV_HEIGHT + 15}px)`}>
        <List>
          <ListItemButton onClick={() => handleNavigateTo("")}>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText>홈</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigateTo("group-tag")}>
            <ListItemIcon></ListItemIcon>
            <ListItemText>그룹 태그</ListItemText>
          </ListItemButton>
        </List>
      </Col>
    </MDrawer>
  );
}


