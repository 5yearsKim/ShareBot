import React from "react";
import { useLocale } from "@/system/navigator";
import { Row, Col, Box, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { CalendarIcon } from "@/ui/icons";
import { Avatar } from "@mui/material";
import { differenceInMinutes } from "date-fns";
import { vizTime, vizDate } from "@/utils/time";
import { BOT_INFO } from "@/config";
import type { AiMessageT, AiMessageFormT } from "@/types";

type AiMessageItemProps = {
  message: AiMessageT;
  size?: "small" | "medium";
  prevMessage: AiMessageT | null;
  nextMessage: AiMessageT | null;
};


export const AiMessageItem = React.memo(_AiMessageItem);

function _AiMessageItem({
  message,
  size,
  prevMessage: pMsg,
  nextMessage: nMsg,
}: AiMessageItemProps): JSX.Element {
  const locale = useLocale();
  const isMine = message.type == "user";

  function renderTime(): JSX.Element {
    const msgTime = vizTime(message.created_at, { type: "chat", locale });
    if (
      nMsg &&
      nMsg.sender_id == message.sender_id &&
      msgTime == vizTime(nMsg.created_at, { type: "chat", locale })
    ) {
      return <></>;
    }

    return (
      <Box mx={0.5}>
        <Txt
          variant='body3'
          color='vague.light'
        >
          {msgTime}
        </Txt>
      </Box>
    );
  }

  function renderDate(): JSX.Element {
    const msgDate = vizDate(message.created_at, { type: "short", locale });
    if (pMsg && msgDate == vizDate(pMsg.created_at, { type: "short", locale })) {
      return <></>;
    }
    return (
      <Row
        justifyContent='center'
        mt={2}
      >
        <CalendarIcon sx={{ color: "vague.main", fontSize: 18 }} />

        <Gap x={0.5} />

        <Txt
          variant='body2'
          color='vague.main'
        >
          {msgDate}
        </Txt>
      </Row>
    );
  }

  const prevTimeDiff = pMsg
    ? differenceInMinutes(new Date(message.created_at), new Date(pMsg.created_at))
    : 200;

  const hideAuthor = pMsg?.sender_id == message.sender_id && prevTimeDiff < 5;

  return (
    <Col
      my={0.5}
      width='100%'
      position='relative'
    >
      {renderDate()}
      <AuthorContainer
        isMine={isMine}
        message={message}
        hidden={hideAuthor}
      >
        <Row
          flexDirection={isMine ? "row-reverse" : "row"}
          alignItems='flex-end'
          // width={isMine ? "100%" : "calc(100% - 60px)"}
          width='100%'
        >
          <ChatMessageBodyItem
            message={message}
            size={size ?? "medium"}
          />
          {renderTime()}
        </Row>
      </AuthorContainer>
    </Col>
  );
}

type ChatMessageBodyItemProps = {
  message: AiMessageFormT;
  size?: "small" | "medium";
};

export function ChatMessageBodyItem({
  message,
  size,
}: ChatMessageBodyItemProps): JSX.Element {
  const isMine = message.type == "user";

  return (
    <Box
      px={1}
      py={0.2}
      my={0.2}
      borderRadius={1.5}
      // bgcolor={isMine ? indigo[700] : amber[100]}
      // color={isMine ? "#ffffff" : "#000000"}
      bgcolor={isMine ? "#D1F6A6" : "#fff"}
      color={isMine ? "#000000" : "#000000"}
      maxWidth='min(70%, 300px)'
      sx={{
        borderTopRightRadius: isMine ? 0 : undefined,
        borderTopLeftRadius: isMine ? undefined : 0,
      }}
    >
      <Txt
        variant={size == "small" ? "body2" : "body1"}
        sx={{ overflowWrap: "break-word", whiteSpace: "pre-wrap" }}
      >
        {message.message}
      </Txt>
    </Box>
  );
}

type AuthorContainerProps = {
  isMine: boolean;
  hidden: boolean;
  message: AiMessageT;
  children: JSX.Element;
};

export function AuthorContainer({
  isMine,
  hidden,
  message,
  children,
}: AuthorContainerProps) {

  if (isMine) {
    return children;
  }


  if (hidden) {
    return (
      <Row>
        <Box mr={5.5} />
        {children}
      </Row>
    );
  }

  return (
    <Row
      mt={1}
      alignItems='flex-start'
    >
      <Avatar
        src={BOT_INFO.thumbnail}
        alt={BOT_INFO.name}
      />
      <Gap x={1} />
      <Col width='100%'>
        <Row alignItems='center'>
          <Txt variant='body3' fontWeight={500}>{BOT_INFO.name}</Txt>
        </Row>
        {children}
      </Col>
    </Row>
  );
}
