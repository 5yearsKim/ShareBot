"use client";
import React from "react";
import { Container, Gap } from "@/ui/layouts";
import { Divider } from "@mui/material";
import { Txt } from "@/ui/texts";
import { GroupFileList } from "./GroupFileList";


export function GroupFileMainPage(): JSX.Element {


  return (
    <Container rtlP>
      <Txt variant="h4">내 파일</Txt>

      <Divider sx={{ py: 1 }}/>

      <Gap y={4}/>

      <GroupFileList/>

    </Container>
  );
}