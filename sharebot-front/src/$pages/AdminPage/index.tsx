"use client";

import React from "react";
import Link from "next/link";
import { Container, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { Button } from "@mui/material";


export function AdminPage(): JSX.Element {
  return (
    <Container>
      <Txt variant="h4">관리자 페이지</Txt>

      <Gap y={2} />

      <Link href='/'>
        <Button
          variant='outlined'
        >
          메인으로 돌아가기
        </Button>
      </Link>


    </Container>
  );
}
