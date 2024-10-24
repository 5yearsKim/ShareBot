import React from "react";
import Link from "next/link";
import { Toolbar } from "@mui/material";
import { Row, Box, Expand } from "@/ui/layouts";
import { NAV_HEIGHT } from "@/ui/global";
import { Txt } from "@/ui/texts";
import { aggro } from "@/ui/systems/fonts";
import { AccountButton } from "./AccountButton";


export function Navbar() {
  return (
    <Row width='100%' height={NAV_HEIGHT}>
      <Toolbar
        sx={{
          margin: "auto",
          width: "100%",
          maxWidth: 1200,
        }}
      >
        <Link href='/'>
          <Box
            sx={{
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <Txt variant="h6" className={aggro.className} >GOSSIP BAO</Txt>
          </Box>
        </Link>

        <Expand/>

        <AccountButton/>

      </Toolbar>
    </Row>
  );
}