"use client";
import React, { ReactNode, useState } from "react";
import { Gap, Box, Row, Col } from "@/ui/layouts";
import { Dialog, TextField, Button, CircularProgress } from "@mui/material";
import { useSnackbar } from "@/hooks/Snackbar";
import * as GroupTagApi from "@/apis/group_tags";
import type { GroupTagT } from "@/types";

type GroupTagAdderProps = {
  children: ReactNode
  onCreated: (item: GroupTagT) => void
}

export function GroupTagAdder({
  children,
  onCreated,
}: GroupTagAdderProps): JSX.Element {
  const [label, setLabel] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const submitDisabled = label.length == 0 || isSubmitting;


  function handleEditorOpen(): void {
    setIsOpen(true);
  }
  function handleEditorClose(): void {
    setIsOpen(false);
  }

  async function handleSubmit(): Promise<void> {
    try {
      setIsSubmitting(true);
      const created = await GroupTagApi.create({ label });
      handleEditorClose();
      onCreated(created);
      setIsSubmitting(false);
      enqueueSnackbar("태그가 추가되었습니다.", { variant: "success" });
    } catch (e) {
      setIsSubmitting(false);
      enqueueSnackbar("태그 추가에 실패했습니다.", { variant: "error" });
    }
  }

  return (
    <>
      <Box onClick={handleEditorOpen}>
        {children}
      </Box>
      <Dialog
        open={isOpen}
        onClose={handleEditorClose}
      >
        <Col py={1} px={2}>
          <TextField
            label="태그명"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            autoComplete="off"
            type='text'
          />
          <Gap y={2}/>
          <Row justifyContent='flex-end'>
            <Button
              onClick={handleEditorClose}
            >
              취소
            </Button>
            <Button
              variant='contained'
              onClick={handleSubmit}
              disabled={submitDisabled}
            >
              {isSubmitting ? <CircularProgress size={"1.5rem"} /> : "추가"}
            </Button>
          </Row>
        </Col>
      </Dialog>
    </>
  );
}