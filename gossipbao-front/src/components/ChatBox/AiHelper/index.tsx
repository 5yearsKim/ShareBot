"use client";
import React from "react";
import { Chip } from "@mui/material";
import { Row, Gap } from "@/ui/layouts";
import { KnowledgeAdder } from "./KnowledgeAdder";
import { KnowledgeViewer } from "./KnowledgeViewer";
import { ModelSelectorWrapper } from "./ModelSelectorWrapper";

type AiHelperProps = {
}


export function AiHelper({}: AiHelperProps): JSX.Element {
  return (
    <Row
      width='100%'
      columnGap={1}
      // justifyContent={{ xs: "left", sm: "center" }}
      justifyContent={"center"}
      overflow='scroll'
      px={2}
      py={1}
      sx={{
        // scrollbarWidth: "thin",
        scrollbarWidth: "none",
      }}
    >
      <Gap x={1}/>
      <KnowledgeAdder>
        <Chip
          label='➕ 지식 추가'
          onClick={() => {}}
        />
      </KnowledgeAdder>
      <KnowledgeViewer>
        <Chip
          label='📖 내가 추가한 지식 보기'
          onClick={() => {}}
        />
      </KnowledgeViewer>
      <ModelSelectorWrapper>
        <Chip
          label='🔧 모델 선택'
          onClick={() => {}}
        />
      </ModelSelectorWrapper>
      {/* <NewChatStarter onNewChatCreated={onNewChatCreated}>
        <Chip
          label='💬 새로운 채팅'
          onClick={() => {}}
        />
      </NewChatStarter> */}
    </Row>
  );
}