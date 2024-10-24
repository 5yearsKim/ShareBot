"use client";
import React, { useState, useEffect, Fragment, ReactNode } from "react";
import { Box, Row, Col, Gap } from "@/ui/layouts";
import { Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useListData } from "@/hooks/ListData";
import * as AiKnowledgeApi from "@/apis/ai_knowledges";
import { ListView } from "@/ui/tools/ListView";
import { Txt } from "@/ui/texts";
import { LoadingIndicator } from "@/components/$statusTools";
import { useMe } from "@/stores/UserStore";
import { vizTime } from "@/utils/time";
import { KnowledgeItem } from "./KnowledgeItem";
import type { AiKnowledgeT, ListAiKnowledgeOptionT } from "@/types";

type KnowledgeViewerProps = {
  children: ReactNode
}

// const mockData = [
//   {
//     content: "안녕하세요",
//     created_at: "2021-10-10T10:10:10",
//   }
// ];

// for (let i = 0; i < 40; i++) {
//   mockData.push({
//     content: "안녕하세요",
//     created_at: "2021-10-10T10:10:10",
//   });
// }

export function KnowledgeViewer({ children }: KnowledgeViewerProps): JSX.Element {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const me = useMe();
  const { data: aiKnowledges$, actions: aiKnowledgesAct } = useListData({
    listFn: AiKnowledgeApi.list,
  });

  const listOpt: ListAiKnowledgeOptionT = {
    userId: me?.id
  };

  useEffect(() => {
    if (dialogOpen) {
      aiKnowledgesAct.load(listOpt);
    }
  }, [dialogOpen]);

  function handleDialogOpen(): void {
    setDialogOpen(true);
  }

  function handleDialogClose(): void {
    setDialogOpen(false);
  }

  function handleLoaderDetect(): void {
    aiKnowledgesAct.refill();
  }

  function handleKnowledgeDeleted(knowledge: AiKnowledgeT): void {
    aiKnowledgesAct.filterItems((item) => item.id != knowledge.id);
  }

  return (
    <>
      <Box onClick={handleDialogOpen}>
        {children}
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>내가 추가한 지식</DialogTitle>
        <DialogContent>

          <Col>
            <Gap y={1} />

            {aiKnowledges$.status == "loading" && (
              <LoadingIndicator/>
            )}

            {aiKnowledges$.status == "error" && (
              <Txt color='vague.main'>지식을 불러올 수 없어요..</Txt>
            )}

            {aiKnowledges$.status == "loaded" && aiKnowledges$.data.length == 0 && (
              <Txt color='vague.main'>아직 추가한 지식이 없어요.</Txt>
            )}

            {aiKnowledges$.status == "loaded" && (
              <ListView
                data={aiKnowledges$.data}
                // data={mockData as unknown as AiKnowledgeT[]}
                renderItem={(item) => {
                  return (
                    <Fragment key={item.id}>
                      <KnowledgeItem item={item} onDeleted={handleKnowledgeDeleted} />
                      <Divider/>
                    </Fragment>
                  );
                }}
                onLoaderDetect={handleLoaderDetect}
              />
            )}

          </Col>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={handleDialogClose}
          >
            확인
          </Button>

        </DialogActions>
      </Dialog>
    </>
  );
}