"use client";

import React, { useState, MouseEvent } from "react";
import { useUser$, useUserActions } from "@/stores/UserStore";
import {
  Button, CircularProgress, IconButton,
  Menu, MenuItem, ListItemIcon, ListItemText,
} from "@mui/material";
import { useGroupRouter } from "@/system/navigator";
import { Row, Box } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { AccountIcon, LogoutIcon, SettingIcon } from "@/ui/icons";
import { Clickable } from "@/ui/tools/Clickable";
// logic
import * as UserApi from "@/apis/users";
import { useLoginDialog } from "@/hooks/dialogs/LoginDialog";
import { useAccount$, useAccountActions } from "@/stores/AccountStore";
import { useMeAdmin } from "@/stores/UserStore";
import { useGroupActions } from "@/stores/GroupStore";
import { useSnackbar } from "@/hooks/Snackbar";
import { useAlertDialog } from "@/hooks/dialogs/ConfirmDialog";
import { useResponsive } from "@/hooks/Responsive";
import type { UserT } from "@/types";


type UserButtonProps = {
  me: UserT
}

export function UserButton({ me }: UserButtonProps): JSX.Element {
  const { downSm } = useResponsive();
  const accountAct = useAccountActions();
  const admin = useMeAdmin();
  const groupAct = useGroupActions();
  const userAct = useUserActions();
  const groupRouter = useGroupRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { showAlertDialog } = useAlertDialog();
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(menuEl);

  function handleMenuOpen(e: MouseEvent<HTMLElement>): void {
    setMenuEl(e.currentTarget);
  }

  function handleMenuClose(): void {
    setMenuEl(null);
  }

  // async function handleLogout(): Promise<void> {
  //   const isOk = await showAlertDialog({
  //     title: "로그아웃",
  //     body: "로그아웃 하시겠어요?",
  //     useCancel: true,
  //     useOk: true,
  //   });
  //   if (!isOk) {
  //     return;
  //   }
  //   accountAct.logout();
  //   setMenuEl(null);
  //   // groupRouter.pushRaw("/");
  //   location.reload();
  // }

  async function handleGroupSettingClick(): Promise<void> {
    groupRouter.push("/setting");
    setMenuEl(null);
  }

  async function handleExitGroupClick(): Promise<void> {
    const isOk = await showAlertDialog({
      title: "그룹 나가기",
      body: "그룹을 나가면 모든 데이터들이 사라져요. 정말로 그룹을 나가시겠어요?",
      useCancel: true,
      useOk: true,
    });
    if (!isOk) {
      return;
    }
    if (admin) {
      const isAdminConfirmOk = await showAlertDialog({
        title: "관리자 권한 포기",
        body: "현재 관리자인 상태로 그룹을 나가면 그룹을 더 이상 관리할 수 없어요. 그래도 그룹을 나가시겠어요?",
        useCancel: true,
        useOk: true,
      });
      if (!isAdminConfirmOk) {
        return;
      }
    }
    try {
      await UserApi.removeMe();
      userAct.reset();
      setMenuEl(null);
      groupAct.set({ status: "init", data: undefined });
      groupRouter.pushRaw("/");
      enqueueSnackbar("그룹을 성공적으로 나갔어요.", { variant: "success" });
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("그룹 나가기에 실패했어요.", { variant: "error" });
    }
  }

  const email = me?.account?.email ?? "no user";

  return (
    <>
      {downSm ? (
        <IconButton
          aria-label='account-icon'
          size='small'
          onClick={handleMenuOpen}
          sx={{ position: "relative" }}
        >
          <AccountIcon sx={{ color: "vague.light" }} />
        </IconButton>
      ) : (
        <Clickable
          onClick={handleMenuOpen}
          borderRadius={1}
          px={1}
          py={1}
        >
          <Row justifyContent='center' position='relative' >
            <AccountIcon sx={{ color: "vague.light" }} />

            <Box ml={1} mb={0.5}>
              <Txt color='vague.main' variant='body3'>{email}</Txt>
            </Box>
          </Row>
        </Clickable>
      )}
      <Menu
        open={isMenuOpen}
        anchorEl={menuEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        {downSm && (
          <Box
            px={1.5}
            width='100%'
            display='flex'
            justifyContent='center'
          >
            <Txt color='vague.main' variant='body3'>{email}</Txt>
          </Box>
        )}

        {/* <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>{"로그아웃"}</ListItemText>
        </MenuItem> */}
        <MenuItem onClick={handleGroupSettingClick}>
          <ListItemIcon>
            <SettingIcon />
          </ListItemIcon>
          <ListItemText>
            그룹 설정
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExitGroupClick}>
          <ListItemIcon>
            <LogoutIcon color='error' />
          </ListItemIcon>
          <ListItemText>
            <Txt color='error.main'>그룹 나가기</Txt>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}