"use client";
import React, { MouseEvent } from "react";
import { IconButton } from "@mui/material";
import { MenuIcon } from "@/ui/icons";
import { useNavbarDrawer } from "@/hooks/NavbarDrawer";

export function NavMenuButton() {
  const {
    mainOpen,
    closeDrawer,
    openDrawer,
  } = useNavbarDrawer();

  function handleClick(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    e.stopPropagation();
    if (mainOpen) {
      closeDrawer();
    } else {
      openDrawer("main");
    }
  }
  return (
    <IconButton
      onClick={handleClick}
      aria-label="메뉴 열기"
    >
      <MenuIcon />
    </IconButton>
  );

}