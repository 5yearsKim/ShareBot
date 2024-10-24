"use client";

import React, { ReactNode, useState } from "react";
import { Box, Col, Row, Gap } from "@/ui/layouts";
import { Dialog, Button } from "@mui/material";
import { useAlertDialog } from "@/hooks/dialogs/ConfirmDialog";
import { useSnackbar } from "@/hooks/Snackbar";
import * as GroupTagApi from "@/apis/group_tags";
import type { GroupTagT } from "@/types";

type GroupTagDetailProps = {
  children: ReactNode
  onDeleted: (item: GroupTagT) => void
  item: GroupTagT
}

export function GroupTagDetail({
  children,
  onDeleted,
  item,
}: GroupTagDetailProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const { showAlertDialog } = useAlertDialog();
  const { enqueueSnackbar } = useSnackbar();


  function handleOpen(): void {
    setOpen(true);
  }
  function handleClose(): void {
    setOpen(false);
  }

  async function handleDeleteClick(): Promise<void> {
    const isOk = await showAlertDialog({
      title: "태그 삭제",
      body: "태그를 삭제하시겠어요?",
      useCancel: true,
      useOk: true,
    });
    if (!isOk) {
      return;
    }
    try {
      const removed = await GroupTagApi.remove(item.id);
      onDeleted(removed);
      handleClose();
      enqueueSnackbar("삭제되었습니다.", { variant: "success" });
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("태그 삭제에 실패했어요.", { variant: "error" });
    }
  }
  return (
    <>
      <Box onClick={handleOpen}>
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <Col p={2}>
          <Button
            variant='outlined'
            color='error'
            onClick={handleDeleteClick}
          >
            삭제하기
          </Button>
          <Gap y={2}/>
          <Row>
            <Button onClick={handleClose}>
              취소
            </Button>

          </Row>
        </Col>

      </Dialog>
    </>
  );
}