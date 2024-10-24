"use client";
import React, { } from "react";
import { useGroupRouter } from "@/system/navigator";
import {
  Button,
} from "@mui/material";
import { ChatModelSelector } from "./ChatModelSelector";
import { HomeIcon } from "@/ui/icons";

import { Container, Gap, Row } from "@/ui/layouts";
import { Txt } from "@/ui/texts";

export function GroupSettingPage(): JSX.Element {

  const groupRouter = useGroupRouter();

  function handleHomeClick(): void {
    groupRouter.replace("/");
  }

  return (
    <Container rtlP>
      <Txt variant="h4">그룹 설정</Txt>

      <Gap y={4} />

      <ChatModelSelector />

      <Gap y={4}/>

      <Row width='100%' justifyContent='center'>
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={handleHomeClick}
        >
          <Txt>그룹 돌아가기</Txt>
        </Button>
      </Row>

    </Container>
  );
}