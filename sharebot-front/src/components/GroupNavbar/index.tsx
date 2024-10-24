"use client";
import React from "react";
import { GroupLink } from "@/system/navigator";
import { Toolbar, CircularProgress, Divider } from "@mui/material";
import { Row, Box, Center, Gap, Expand } from "@/ui/layouts";
import { useGroup } from "@/stores/GroupStore";
import { useUser$ } from "@/stores/UserStore";
import { Txt } from "@/ui/texts";
import { aggro } from "@/ui/systems/fonts";
import { FocusTab } from "./FocusTab";
import { NavMenuButton } from "./NavMenuButton";
import { UserButton } from "./UserButton";


export function GroupNavbar() {
  const group = useGroup();
  const user$ = useUser$();

  return (
    <Row width='100%'>
      <Toolbar
        sx={{
          margin: "auto",
          width: "100%",
          maxWidth: 1200,
        }}
      >
        <NavMenuButton/>
        <Box ml={{ xs: 0, sm: "120px" }} display='flex' flex={1} justifyContent='center'>
          <Txt fontFamily={aggro.style.fontFamily} variant="h5">{group.name.toUpperCase()}</Txt>
        </Box>
        {/* <GroupLink href='/'>
          <Txt fontFamily={aggro.style.fontFamily} variant="h6">{group.name.toUpperCase()}</Txt>
        </GroupLink>

        <Divider
          orientation='vertical'
          sx={{ height: 30, ml: 2, mr: 1.5 }}
        />


        <GroupLink href='/boards'>
          <FocusTab isFocused={(path): boolean => path.endsWith("/boards")}>
            <Txt variant='subtitle2'>채팅</Txt>
          </FocusTab>
        </GroupLink>

        <GroupLink href='/boards'>
          <FocusTab isFocused={(path): boolean => path.endsWith("/boards")}>
            <Txt variant='subtitle2'>커뮤니티</Txt>
          </FocusTab>
        </GroupLink>


        <Expand/>
      */}

        {user$.status == "loading" && (
          <CircularProgress size='1.5rem'/>
        )}
        { (user$.status == "loaded" && user$.data.me !== null ) && (
          <UserButton me={user$.data.me}/>
        )}

      </Toolbar>
    </Row>
  );
}

