import React, { ReactNode } from "react";
import { Box } from "@/ui/layouts";


type NavbarLayoutProps = {
  children: ReactNode
  navbar: ReactNode
  height: number
}

export function NavbarLayout({
  children,
  navbar,
  height,
}: NavbarLayoutProps) {
  return (
    <>
      <Box
        position='fixed'
        boxShadow={1}
        height={height}
        bgcolor='paper.main'
        width='100%'
        zIndex='100'
      >
        {navbar}
      </Box>

      <Box height={height}/>

      {children}
    </>
  );
}