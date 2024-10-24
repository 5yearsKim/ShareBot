"use client";
import React, { useState, ReactNode } from "react";
import Image from "next/image";
import {
  Drawer, Box, Divider,
  List, ListItemButton, ListItemIcon, ListItemText, ListItem,
} from "@mui/material";
import { useResponsive } from "@/hooks/Responsive";
import { DRAWER_WIDTH, NAV_HEIGHT } from "@/ui/global";
import { Row, Col, Gap, Expand } from "@/ui/layouts";
import { HomeIcon, DashboardIcon, SettingIcon } from "@/ui/icons";
import { Txt } from "@/ui/texts";
import { GroupAvatar } from "@/ui/tools/Avatar";
import { GroupInfoDialog } from "@/components/GroupInfoDialog";
import { ChatPannel } from "./ChatPannel";
// logic
import { useGroupRouter } from "@/system/navigator";
import { useNavbarDrawer } from "@/hooks/NavbarDrawer";
import { useMe, useMeAdmin } from "@/stores/UserStore";
import { useGroup } from "@/stores/GroupStore";
import { BOT_INFO, FRONT_URL } from "@/config";

export function GroupDrawer(): ReactNode {
  const me = useMe();
  const admin = useMeAdmin();
  const group = useGroup();
  // const router = useRouter();
  const groupRouter = useGroupRouter();
  const { mainOpen, closeDrawer } = useNavbarDrawer();

  const [groupDialogOpen, setGroupDialogOpen] = useState<boolean>(false);

  function handleClose(): void {
    closeDrawer();
  }

  function handleDashboardClick(): void {
    closeDrawer();
    groupRouter.pushRaw("/dashboard");
  }

  function handleNavigateTo(to: string): void {
    closeDrawer();
    groupRouter.replace(to);
  }


  return (
    <MDrawer isOpen={mainOpen} onClose={handleClose}>
      <Col minHeight={`calc(100vh - ${NAV_HEIGHT + 15}px)`}>
        <List>
          <ListItemButton onClick={() => setGroupDialogOpen(true)} >
            <Row>
              <GroupAvatar group={group} size={34}/>
              {/* <Image
                src={BOT_INFO.thumbnail}
                alt={BOT_INFO.name}
                width={34}
                height={34}
              /> */}
              <Gap x={1}/>
              <Col>
                <Txt fontWeight={700}>{group.short_name ?? group.name}</Txt>
                <Txt variant="body3">{`${FRONT_URL}/g/${group.key}`}</Txt>
              </Col>
            </Row>
          </ListItemButton>


          <GroupInfoDialog
            group={group}
            open={groupDialogOpen}
            onClose={() => setGroupDialogOpen(false)}
          />

          <Divider sx={{ my: 1 }}/>


          <ListItemButton onClick={handleDashboardClick}>
            <ListItemIcon>
              <DashboardIcon color='primary' />
            </ListItemIcon>
            <ListItemText>
              <Txt fontWeight={500}>대시보드</Txt>
            </ListItemText>
          </ListItemButton>
          {/*
          <ListItemButton onClick={(): void => handleNavigateTo("/")}>
            <ListItemIcon>
              <HomeIcon color='primary' />
            </ListItemIcon>
            <ListItemText>
              <Txt fontWeight={500}>홈으로</Txt>
            </ListItemText>
          </ListItemButton>
          */}


          {admin && (
            <ListItemButton onClick={() => handleNavigateTo("/admin")}>
              <ListItemIcon>
                <SettingIcon/>
              </ListItemIcon>
              <ListItemText>
                <Txt fontWeight={500}>그룹 관리</Txt>
              </ListItemText>
            </ListItemButton>
          )}

        </List>

        <ChatPannel
          closeDrawer={closeDrawer}
        />

      </Col>
    </MDrawer>
  );
}

type MDrawerProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => any;
};

export function MDrawer({
  isOpen,
  children,
  onClose,
}: MDrawerProps): ReactNode {

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        zIndex: 10,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          paddingTop: `${NAV_HEIGHT + 8}px`,
        },
      }}
      PaperProps={{
        elevation: 1,
        sx: { bgcolor: "paper.main" },
      }}
    >
      <Box width={DRAWER_WIDTH}>
        {children}
      </Box>
    </Drawer>
  );
}
