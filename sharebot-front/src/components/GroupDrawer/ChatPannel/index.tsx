"use client";

import React, { useEffect } from "react";
import {
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider,
  Button,
} from "@mui/material";
import { Col, Row, Expand } from "@/ui/layouts";
import * as AiChatApi from "@/apis/ai_chats";
import { useListData } from "@/hooks/ListData";
import { useResponsive } from "@/hooks/Responsive";
import { useMe } from "@/stores/UserStore";
import { useMainAiChat$ } from "@/stores/MainAiChatStore";
import { Txt, EllipsisTxt } from "@/ui/texts";
import { AddIcon } from "@/ui/icons";
import { vizTime } from "@/utils/time";
import { LoadingIndicator } from "@/components/$statusTools";
import { setMainAiChatEv } from "@/system/global_events";
import { CreateChatWrapper } from "./CreateChatWrapper";
import type { AiChatT, ListAiChatOptionT } from "@/types";

function getChatTitle(chat: AiChatT): string {
  return chat.last_message?.message ?? chat.title ?? "채팅_" + vizTime(chat.created_at, { type: "absolute", locale: "ko" });

}

type ChatPannelProps = {
  closeDrawer: () => void;
}

export function ChatPannel({
  closeDrawer,
}: ChatPannelProps): JSX.Element {
  const me = useMe();
  const mainAiChat$ = useMainAiChat$();
  const { downSm } = useResponsive();

  const { data: aiChats$, actions: aiChatsAct } = useListData({
    listFn: AiChatApi.list
  });

  const listOpt: ListAiChatOptionT = {
    userId: me?.id,
    $lastMessage: true,
  };
  useEffect(() => {
    aiChatsAct.load(listOpt);
  }, []);


  function handleChatCreated(chat: AiChatT): void {
    setMainAiChatEv.emit(chat);
    aiChatsAct.splice(0, 0, chat);
    closeDrawer();
  }

  function handleSelectChat(chat: AiChatT): void {
    setMainAiChatEv.emit(chat);
    closeDrawer();
  }


  const { data: aiChats, status } = aiChats$;

  return (
    <List>

      <Row px={2} py={1}>
        <Txt variant='subtitle2'>채팅</Txt>
        <Expand/>
        <CreateChatWrapper onChatCreated={handleChatCreated}>
          <Button
            size='small'
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 8
            }}
          >
            NEW
          </Button>
        </CreateChatWrapper>
      </Row>
      {/* <ListItem>
        <CreateChatWrapper onChatCreated={handleChatCreated}>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>
              새로운 채팅
            </ListItemText>
          </ListItemButton>
        </CreateChatWrapper>
      </ListItem> */}


      {(status == "loading") && (
        <LoadingIndicator size='1.5rem'/>
      )}

      {status === "loaded" && (
        aiChats.map((chat) => {
          const isSelected = mainAiChat$.data?.chat?.id === chat.id;
          return (
            <ListItem key={chat.id} sx={{ p: 0, bgcolor: isSelected ? "rgba(55, 255, 155, 0.2)" : undefined }}>
              <ListItemButton onClick={() => handleSelectChat(chat)}>
                <Col>
                  <EllipsisTxt maxLines={2}>
                    {getChatTitle(chat)}
                  </EllipsisTxt>
                  <Row width='100%' justifyContent='flex-end'>
                    <Txt variant='caption' color='vague.main'>
                      {vizTime(chat.created_at, { type: "relative", locale: "ko" })}
                    </Txt>
                  </Row>
                </Col>
              </ListItemButton>
            </ListItem>
          );
        }
        )
      )}
    </List>
  );
}