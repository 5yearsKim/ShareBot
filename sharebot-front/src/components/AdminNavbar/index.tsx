"use client";
import React from "react";
import { Toolbar, IconButton } from "@mui/material";
import { MenuIcon } from "@/ui/icons";
import { Row, Box, Gap, Center } from "@/ui/layouts";
import { useNavbarDrawer } from "@/hooks/NavbarDrawer";
import { Txt } from "@/ui/texts";
import { AdminDrawer } from "../AdminDrawer";


export function AdminNavbar() {
  const { adminOpen, openDrawer, closeDrawer } = useNavbarDrawer();

  function handleMenuClick(): void {
    if (adminOpen) {
      closeDrawer();
    } else {
      openDrawer("admin");
    }
  }

  return (
    <>
      <Row width='100%'>
        <Toolbar
          sx={{
            margin: "auto",
            width: "100%",
            maxWidth: 1200,
          }}
        >
          <IconButton onClick={handleMenuClick}>
            <MenuIcon/>
          </IconButton>

          <Gap x={2}/>

          <Txt variant='h5'>ADMIN</Txt>

        </Toolbar>
      </Row>
      <AdminDrawer/>
    </>
  );
}
