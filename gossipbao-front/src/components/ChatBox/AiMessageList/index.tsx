"use client";

import React, {
  useEffect, Fragment,
  forwardRef, useImperativeHandle,
} from "react";
import { Row, Col, Center } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { ListView, AppendLoading, AppendError } from "@/ui/tools/ListView";
import { LoadingIndicator, ErrorBox } from "@/components/$statusTools";
import { AiMessageItem } from "@/components/AiMessageItem";
import { useListData } from "@/hooks/ListData";
import * as AiMessageApi from "@/apis/ai_messages";
import type { AiChatT, AiMessageT, ListAiMessageOptionT } from "@/types";

export type AiMessageListT = {
  push: (message: AiMessageT) => void
  getHeadMessages: () => AiMessageT[]
  clear: () => void
}

type AiMessageListProps = {
  chat: AiChatT
  messageSize?: "small" | "medium";
  onLoadMessages?: (messages: AiMessageT[]) => void;
}

export const AiMessageList = forwardRef<AiMessageListT, AiMessageListProps>((props, ref) => {
  const {
    chat,
    messageSize,
    onLoadMessages,
  } = props;

  const { data: aiMessages$, actions: aiMessagesAct } = useListData({
    listFn: AiMessageApi.list,
  });

  const listOpt: ListAiMessageOptionT = {
    chatId: chat.id
  };

  useImperativeHandle(ref, () => {
    return {
      push: (message: AiMessageT) => {
        aiMessagesAct.splice(0, 0, message);
      },
      getHeadMessages: () => {
        let messages = aiMessages$.data;
        if (messages.length > 10) {
          messages = messages.slice(0, 10);
        }
        return messages;
      },
      clear: () => {
        aiMessagesAct.patch({ data: [] });
      }
    };
  });

  useEffect(() => {
    aiMessagesAct.load(listOpt);
  }, [chat.id]);

  useEffect(() => {
    if (aiMessages$.status == "loaded") {
      onLoadMessages && onLoadMessages(aiMessages$.data);
    }
  }, [aiMessages$.status]);


  function handleErrorRetry(): void {
    aiMessagesAct.load(listOpt, { force: true });
  }

  function handleLoaderDetect(): void {
    aiMessagesAct.refill();
  }

  function handleAppendRetry(): void {
    aiMessagesAct.refill();
  }

  const { data: aiMessages, status, appendingStatus } = aiMessages$;

  if (status == "init") {
    return (
      <Center
        width='100%'
        height='100%'
      >
        <Txt color='vague.main'>...</Txt>
      </Center>
    );
  }
  if (status == "loading") {
    return (
      <Center
        width='100%'
        height='100%'
      >
        <LoadingIndicator />
      </Center>
    );
  }
  if (status == "error") {
    return (
      <Center
        width='100%'
        height='100%'
      >
        <ErrorBox onRetry={handleErrorRetry} />
      </Center>
    );
  }

  return (
    <Col flexDirection='column-reverse'>
      <ListView
        data={aiMessages}
        renderItem={(item, idx): JSX.Element => {
          const isMine = item.type == "user";
          let prevItem: AiMessageT | null = null;
          let nextItem: AiMessageT | null = null;
          if (idx > 0) {
            nextItem = aiMessages[idx - 1];
          }
          if (idx < aiMessages.length - 1) {
            prevItem = aiMessages[idx + 1];
          }
          // const numUnread = lastCheckAts.filter((lca) => lca < new Date(item.created_at)).length;
          return (
            <Fragment key={item.id}>
              <AiMessageItem
                message={item}
                size={messageSize}
                nextMessage={nextItem}
                prevMessage={prevItem}
              />
            </Fragment>
          );
        }}
        onLoaderDetect={handleLoaderDetect}
        renderAppend={(): JSX.Element => {
          return (
            <Row
              width='100%'
              justifyContent='center'
            >
              {appendingStatus == "loading" && <AppendLoading />}
              {appendingStatus == "error" && <AppendError onRetry={handleAppendRetry} />}
            </Row>
          );
        }}
      />
    </Col>
  );
});