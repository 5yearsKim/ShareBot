import React from "react";
import { useConfirmDialog } from "./hook";
import { DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { useAccount$ } from "@/stores/AccountStore";

export interface AlertDialogT {
  title?: string;
  body: string;
  useOk?: boolean;
  useCancel?: boolean;
  dismissible?: boolean;
  themeDisabled?: boolean;
}

export function useAlertDialog() {
  const { showConfirmDialog } = useConfirmDialog();

  function showAlertDialog(option: AlertDialogT): Promise<null | boolean> {
    const { title, body, useOk, useCancel, dismissible, themeDisabled } = option;
    const main = (
      <>
        {Boolean(title) && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
      </>
    );
    return showConfirmDialog({
      main,
      useOk,
      useCancel,
      dismissible,
      themeDisabled,
    });
  }

  return {
    showAlertDialog,
  };
}

export interface LoginAlertDialogT {
  themeDisabled?: boolean;
}

export function useLoginAlertDialog({ themeDisabled }: LoginAlertDialogT = {}) {
  const { showAlertDialog } = useAlertDialog();

  const account$ = useAccount$();

  async function showLoginAlertDialog(): Promise<void> {
    await showAlertDialog({
      body: account$.status == "loggedIn" ?
        "그룹 멤버에게만 공개된 서비스에요." :
        "로그인이 필요한 서비스에요." ,
      useOk: true,
      themeDisabled,
    });
  }


  return {
    showLoginAlertDialog,
  };
}
