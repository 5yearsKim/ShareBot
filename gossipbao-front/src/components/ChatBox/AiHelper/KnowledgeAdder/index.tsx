"use client";
import React, { useState, ReactNode, ChangeEvent } from "react";
import { Box, Row, Col, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { Dialog, Avatar, TextField, Button, CircularProgress } from "@mui/material";
import { useAlertDialog } from "@/hooks/dialogs/ConfirmDialog";
import { useSnackbar } from "@/hooks/Snackbar";
import { useGroup } from "@/stores/GroupStore";
import { useMe } from "@/stores/UserStore";
import * as AiKnowledgeApi from "@/apis/ai_knowledges";
import { BOT_INFO } from "@/config";
import type { AiKnowledgeFormT } from "@/types";


type KnowledgeAdderProps = {
  children: ReactNode
}

export function KnowledgeAdder({
  children,
}: KnowledgeAdderProps): JSX.Element {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [knowledge, setKnowledge] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const me = useMe();
  const group = useGroup();
  const { showAlertDialog } = useAlertDialog();
  const { enqueueSnackbar } = useSnackbar();

  function handleDialogOpen(): void {
    setDialogOpen(true);
  }

  function handleKnowldgeChange(e: ChangeEvent<HTMLInputElement>): void {
    setKnowledge(e.target.value);
  }

  async function handleDialogClose(): Promise<void> {
    if (knowledge.length == 0) {
      setDialogOpen(false);
      return;
    } else {
      const isOk = await showAlertDialog({
        title: "지식 추가 취소",
        body: "작성중인 내용 지우고 지식 추가를 취소할까요?",
        useCancel: true,
        useOk: true,
      });
      if (!isOk) {
        return;
      }
      setKnowledge("");
      setDialogOpen(false);
    }
  }

  async function handleSubmit(): Promise<void> {
    if (!me) {
      showAlertDialog({
        body: "로그인 후 이용해주세요.",
        useCancel: false,
        useOk: true,
      });
      return;
    }
    if (knowledge.length < 10) {
      showAlertDialog({
        body: "10자 이상 입력해주세요.",
        useCancel: false,
        useOk: true,
      });
      return;
    }
    if (knowledge.length > 10000) {
      showAlertDialog({
        body: "10000자 이하로 입력해주세요.",
        useCancel: false,
        useOk: true,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const form: AiKnowledgeFormT = {
        user_id: me.id,
        group_id: group.id,
        content: knowledge,
        applied_info: null,
      };
      await AiKnowledgeApi.create(form);
      enqueueSnackbar("지식이 추가되었어요.", { variant: "success" });
      setKnowledge("");
      setDialogOpen(false);
    } catch (e) {
      enqueueSnackbar("지식 추가에 실패했어요.", { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Box onClick={handleDialogOpen}>
        {children}
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <Col px={2} py={2}>
          <Row>
            <Avatar
              src={BOT_INFO.thumbnail}
            />
            <Gap x={1} />

            <Txt fontWeight={700}>나에게 재밌는 정보를 알려줄래? 정보를 기반으로 대답해줄게!</Txt>
          </Row>

          <Gap y={2} />

          <TextField
            value={knowledge}
            onChange={handleKnowldgeChange}
            variant="standard"
            placeholder='ex) ㅁㅁㅁ 는 요즘 좋아하는 사람이 생긴 것 같다.'
            multiline
            minRows={3}
            maxRows={8}
          />

          <Gap y={2} />

          <Row justifyContent='flex-end' width='100%'>
            <Button
              onClick={handleDialogClose}
            >
              취소
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={knowledge.length == 0 || isSubmitting}
            >
              {isSubmitting ?
                <CircularProgress size='1.5rem' sx={{ color: "#fff" }}/> :
                "지식 추가"
              }
            </Button>

          </Row>
        </Col>
      </Dialog>
    </>
  );
}