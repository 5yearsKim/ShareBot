"use client";
import React, { useState, useRef, useEffect } from "react";
import { Collapse, Button, lighten, useTheme } from "@mui/material";
import { Box, Row, Col, Expand } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { FoldIcon, UnfoldIcon, DeleteOlIcon } from "@/ui/icons";
import { useAlertDialog } from "@/hooks/dialogs/ConfirmDialog";
import { useSnackbar } from "@/hooks/Snackbar";
import { vizTime } from "@/utils/time";
import * as AiKnowedgeApi from "@/apis/ai_knowledges";
import type { AiKnowledgeT } from "@/types";


type KnowledgeItemProps = {
  item: AiKnowledgeT
  onDeleted: (item: AiKnowledgeT) => void
}

export function KnowledgeItem({
  item,
  onDeleted,
}: KnowledgeItemProps): JSX.Element {
  const theme = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const { showAlertDialog } = useAlertDialog();
  const { enqueueSnackbar } = useSnackbar();

  const contentHeight = 80;
  const [isShowExpand, setIsShowExpand] = useState<boolean>(false);

  useEffect(() => {
    if (contentRef.current) {
      setIsShowExpand(contentRef.current.clientHeight > 80);
    }
  }, []);

  async function handleDeleteClick(): Promise<void> {
    const isOk = await showAlertDialog({
      title: "지식 삭제",
      body: "내가 추가한 지식을 삭제하시겠어요?",
      useCancel: true,
      useOk: true,
    });

    if (!isOk) {
      return;
    }
    try {
      const removed = await AiKnowedgeApi.remove(item.id);
      onDeleted(removed);
      enqueueSnackbar("삭제되었습니다.", { variant: "success" });
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("지식을 삭제에 실패했어요.", { variant: "error" });
    }
  }


  return (
    <Col>
      <Box position='relative'>
        <Collapse in={isExpand} collapsedSize={contentHeight}>
          <div ref={contentRef}>
            <Txt>{item.content}</Txt>
          </div>
        </Collapse>
        {!isExpand && (
          <Box
            position='absolute'
            width='100%'
            bottom={0}
            height='50px'
            sx={{
              background: `linear-gradient(transparent, ${lighten(theme.palette.paper.main, 0.19)})`,
            }}
          />
        )}
      </Box>
      <Row>
        <Txt variant='caption'>{vizTime(item.created_at, { type: "relative", locale: "ko" } )}</Txt>
        <Expand/>
        {/* only if contentRef height is bigger than 80 */}
        {isShowExpand && (
          <Button
            size='small'
            onClick={() => setIsExpand((prev) => !prev)}
            startIcon={isExpand ? <FoldIcon /> : <UnfoldIcon />}
            sx={{ mx: 1 }}
          >
            {isExpand ? "접기" : "더보기"}
          </Button>
        )}
        <Button
          // variant="outlined"
          size='small'
          color='error'
          startIcon={<DeleteOlIcon fontSize="small" />}
          onClick={handleDeleteClick}
        >
          삭제
        </Button>
      </Row>
    </Col>
  );
}