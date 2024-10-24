"use client";
import React, { ReactNode } from "react";
import { Box } from "@/ui/layouts";
import * as AiChatApi from "@/apis/ai_chats";
import { useAlertDialog } from "@/hooks/dialogs/ConfirmDialog";
import { useMe } from "@/stores/UserStore";
import { format as dfFormat } from "date-fns";
import type { AiChatFormT, AiChatT } from "@/types";


type NewChatStarterProps = {
  children: ReactNode
  onNewChatCreated: (chat: AiChatT) => void
}

export function NewChatStarter({
  children,
  onNewChatCreated,
}: NewChatStarterProps): JSX.Element {
  const { showAlertDialog } = useAlertDialog();
  const me = useMe();

  async function handleClick(): Promise<void> {
    const isOk = await showAlertDialog({
      title: "새로운 채팅",
      body: "채팅 내역을 지우고 새로운 채팅을 시작하시겠어요?",
      useCancel: true,
      useOk: true,
    });
    if (!isOk) {
      return;
    }
    try {
      const form: AiChatFormT = {
        user_id: me!.id,
        title: `채팅 ${dfFormat(new Date(), "yyyy-MM-dd HH:mm")}`
      };
      const created = await AiChatApi.create(form);
      onNewChatCreated(created);
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <Box onClick={handleClick}>
      {children}
    </Box>
  );
}