"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import { Txt } from "@/ui/texts";
import { useAccount} from "@/stores/AccountStore";
import { useLoginDialog } from "@/hooks/dialogs/LoginDialog";


export function StartButton(): JSX.Element {
  const router = useRouter();
  const account = useAccount();
  const { openLoginDialog } = useLoginDialog();

  function onStartClick(): void {
    if (account) {
      router.replace("/dashboard");
    } else {
      openLoginDialog();
    }
  }

  return (
    <Button
      size='large'
      variant='contained'
      sx={{
        minWidth: 200,
        minHeight: 40,
        borderRadius: 18
      }}
      onClick={onStartClick}
    >
      {/* 시작하기 */}
      <Txt variant='h6' fontSize={18}>시작하기</Txt>
    </Button>
  );
}