"use client";
import React, { ReactNode } from "react";
import { format as dfFormat } from "date-fns";
import { Box } from "@/ui/layouts";
import { useMe } from "@/stores/UserStore";
import { useAlertDialog } from "@/hooks/dialogs/ConfirmDialog";
import { AiChatT, AiChatFormT } from "@/types";
import * as AiChatApi from "@/apis/ai_chats";

type CreateChatWrapperProps = {
  children: ReactNode
  onChatCreated: (chat: AiChatT) => void;
}

export function CreateChatWrapper({
  children,
  onChatCreated,
}: CreateChatWrapperProps): JSX.Element {
  const me = useMe();
  const { showAlertDialog } = useAlertDialog();

  async function handleCreateChatClick(): Promise<void> {
    const isOk = await showAlertDialog({
      title: "새 채팅",
      body: "새로운 채팅을 시작할까요?",
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
      onChatCreated(created);
    } catch (e) {
      console.warn(e);
    }
  }
  return (
    <Box onClick={handleCreateChatClick}>
      {children}
    </Box>
  );
}