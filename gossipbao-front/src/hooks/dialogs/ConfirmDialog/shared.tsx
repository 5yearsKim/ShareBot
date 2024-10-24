"use client";

import React, { Fragment } from "react";
import { Button, Dialog, DialogActions } from "@mui/material";
// logic
import { useRecoilState } from "recoil";
import { confirmDialogState } from "./state";

export function ConfirmDialogShared(): JSX.Element {
  const [baseDialog, setBaseDialog] = useRecoilState(confirmDialogState);

  const {
    isOpen,
    main,
    useOk,
    useCancel,
    dismissible,
    themeDisabled,
    onOk,
    onCancel,
    onDismiss,
  } = baseDialog;

  function handleOkClick(): void {
    setBaseDialog({
      ...baseDialog,
      isOpen: false,
    });
    if (onOk) {
      onOk();
    }
  }
  function handleCancelClick(): void {
    setBaseDialog({
      ...baseDialog,
      isOpen: false,
    });
    if (onCancel) {
      onCancel();
    }
  }

  function handleDismissClick(): void {
    if (dismissible === false) {
      return;
    }
    setBaseDialog({
      ...baseDialog,
      isOpen: false,
    });
    if (onDismiss) {
      onDismiss();
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleDismissClick}
      sx={{
        zIndex: 1800,
        minWidth: "300px",
        // https://mui.com/material-ui/customization/z-index/
      }}
    >
      <Fragment>
        {main}

        <DialogActions>
          {useCancel && (
            <Button onClick={handleCancelClick}>
              취소
            </Button>
          )
          }

          {useOk && (
            <Button
              variant='contained'
              onClick={handleOkClick}
            >
              확인
            </Button>
          )}
        </DialogActions>
      </Fragment>
    </Dialog>
  );
}
