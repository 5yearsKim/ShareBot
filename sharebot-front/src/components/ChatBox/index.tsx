"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import * as AiMessageApi from "@/apis/ai_messages";
import * as GlobalApi from "@/apis/global";
import { differenceInMinutes } from "date-fns";

import { Box, Col, Container, Row, Center, Gap } from "@/ui/layouts";
import { LoadingIndicator, LoadingBox, ErrorBox } from "@/components/$statusTools";
import { Txt } from "@/ui/texts";
import { useMe } from "@/stores/UserStore";
import { useGroup } from "@/stores/GroupStore";
import { useMainAiChat$, useMainAiChatActions } from "@/stores/MainAiChatStore";
import { useSnackbar } from "@/hooks/Snackbar";
import { useResponsive } from "@/hooks/Responsive";
import { setMainAiChatEv } from "@/system/global_events";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { ChatInput, type ChatInputT } from "./ChatInput";
import { AiMessageList, type AiMessageListT } from "./AiMessageList";
import { AiHelper } from "./AiHelper";
import type { AiChatT, AiMessageT, AiMessageFormT } from "@/types";


export function ChatBox(): JSX.Element {
  const { downSm } = useResponsive();
  const mainAiChat$ = useMainAiChat$();
  const mainAiChatAct = useMainAiChatActions();

  // const [status, setStatus] = useState<ProcessStatusT>("init");
  // const [chat, setChat] = useState<AiChatT | null>(null);
  const me = useMe();

  useEffect(() => {
    if (me) {
      mainAiChatAct.loadInitialChat();
    }
  }, [me]);

  useEffect(() => {
    setMainAiChatEv.addListener("ChatBox", (chat: AiChatT) => {
      mainAiChatAct.patchData({ chat });
      // setChat(chat);
    });
    return () => {
      setMainAiChatEv.removeListener("ChatBox");
    };
  }, []);

  if (!me) {
    return (
      <Center>
        <LoadingIndicator/>
      </Center>
    );
  }

  const status = mainAiChat$.status;
  const chat = mainAiChat$.data?.chat;

  if (status === "init" || status === "loading") {
    return <LoadingBox height='60vh' message="채팅 로딩중.."/>;
  }

  if (status === "error") {
    return <ErrorBox height="60vh" message='채팅을 로드할 수 없어요.'/>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", height: "100%" }}>
      <ChatContent
        chat={chat!}
      />
    </Box>
  );
}


type ChatContentProps = {
  chat: AiChatT
}


export function ChatContent({ chat }: ChatContentProps): JSX.Element {
  const chatInputRef = useRef<ChatInputT>(null);
  const messagesRef = useRef<AiMessageListT>(null);
  const { enqueueSnackbar } = useSnackbar();
  const me = useMe();
  const group = useGroup();
  const [botStatus, setBotStatus] = useState<"thinking" | "responding" | "idle">("idle");
  const [receivingMsg, setReceivingMsg] = useState<string>("");

  const generatorType = useMemo(() => {
    const cached = localStorage.getItem("generatorType");
    if (!cached) {
      return undefined;
    }
    if (["openai", "claude", "gemini"].includes(cached)) {
      return cached;
    }
    return undefined;
  }, []);


  async function handleMessagesLoaded(messages: AiMessageT[]): Promise<void> {
    let shouldTrigger = false;

    // if no messages or last messages is too long(5 min) ago
    if (messages.length == 0) {
      shouldTrigger = true;
    } else {
      const lastMsg = messages[0];
      const minDiff = differenceInMinutes(new Date(), new Date(messages[0].created_at));
      if ( lastMsg.type == "user" && minDiff > 5) {
        shouldTrigger = true;
      }
    }
    if (shouldTrigger) {
      _handleBotAction(messages, "trigger");
    }
  }

  // function handleNewChatCreated(chat: AiChatT): void {
  //   messagesRef.current?.clear();
  //   onNewChatCreated(chat);
  //   setTimeout(() => {
  //     _handleBotAction([], "trigger");
  //   }, 500);
  // }


  async function handleSend(payload: { message: string }): Promise<void> {
    try {
      const form: AiMessageFormT = {
        chat_id: chat.id,
        message: payload.message,
        type: "user",
        sender_id: me?.id ?? null,
      };
      const created = await AiMessageApi.create(form);
      // console.log("created: ", created);

      _handleBotAction([created, ...(messagesRef.current?.getHeadMessages() ?? [])], "respond");

      chatInputRef.current?.reset();
      messagesRef.current?.push(created);

    } catch (e) {
      console.warn(e);
      enqueueSnackbar("메시지 전송에 실패했어요.", { variant: "error" });
    }
  }

  async function _handleBotAction(messages: AiMessageT[], type: "respond" | "trigger") {
    const sse = type == "trigger" ?
      GlobalApi.botTrigger(group, messages, generatorType) :
      GlobalApi.botRespond(group, messages, generatorType);

    setTimeout(() => {
      if (botStatus == "idle") {
        setBotStatus("thinking");
      }
    }, 1000);

    const closeSse = () => {
      setReceivingMsg("");
      setBotStatus("idle");
      sse.close();
    };

    sse.onmessage = (event) => {
      if (botStatus !== "responding") {
        setBotStatus("responding");
      }
      // parse "data: " string
      let dataStr = event.data;
      if (dataStr.startsWith("data: ")) {
        dataStr = dataStr.slice(6);
      }
      try {
        const data = JSON.parse(dataStr);
        setReceivingMsg((prev) => prev + data.chunk);

        if (data.status == "done") {
          _handleActionDone(data.text);
          closeSse();
        }
      } catch (e) {
        console.warn("error parsing on _handleBotAction:", e);
      }
    };
    sse.onerror = (event) => {
      console.warn("sse error: ", event);
      enqueueSnackbar("봇과의 통신이 불안정합니다.", { variant: "warning" });
      closeSse();
    };
  }

  async function _handleActionDone(message: string) {
    try {
      const form: AiMessageFormT = {
        chat_id: chat.id,
        message: message,
        type: "bot",
        sender_id: null,
      };
      // console.log("form: ", form);
      const created = await AiMessageApi.create(form);
      messagesRef.current?.push(created);
    } catch (e) {
      console.warn(e);
    }
  }


  return (
    <Col
      height='100%'
      flexDirection='column-reverse'
      // bgcolor='green'
    >
      <Box py={{ xs: 0.5, sm: 1 }}/>
      <Box
        mx={1}
        // flexGrow={1}
        flexShrink={0}
        borderRadius={8}
        bgcolor='#fff'
        boxShadow={"0 0 4px 1px rgba(0,0,0,0.15)"}
      >
        <ChatInput
          ref={chatInputRef}
          chat={chat}
          onSend={handleSend}
        />
      </Box>

      <Gap y={1}/>

      <AiHelper/>

      <Gap y={1}/>

      <Box
        position='relative'
        flex={1}
        display='flex'
        flexDirection='column-reverse'
        p={1}
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >

        {(botStatus === "thinking") && (
          <ThinkingIndicator/>
        )}

        {receivingMsg.length > 0 && (
          <Box
            borderRadius={2}
            p={2}
            boxShadow={4}
            maxWidth={400}
            bgcolor='paper.main'
          >
            <Txt>{receivingMsg}(생각중..)</Txt>
          </Box>
        )}

        <AiMessageList
          ref={messagesRef}
          chat={chat}
          onLoadMessages={handleMessagesLoaded}
        />
      </Box>


    </Col>
  );
}