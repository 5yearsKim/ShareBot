"use client";

import React, {
  useState, useRef, ChangeEvent, forwardRef,
  useImperativeHandle, KeyboardEvent,
} from "react";
import { InputBase, Fab, IconButton } from "@mui/material";
import { Box, Row } from "@/ui/layouts";
import { SendIcon } from "@/ui/icons";
import { useMe } from "@/stores/UserStore";
import type { AiChatT, AiMessageFormT } from "@/types";

export type ChatInputT = {
  reset: () => void
}

type ChatInputProps = {
  chat: AiChatT
  onSend: (payload: {message: string}) => void
}


export const ChatInput = forwardRef<ChatInputT, ChatInputProps>((props, ref) => {
  const {
    chat,
    onSend,
  } = props;

  useImperativeHandle(ref, () => {
    return {
      reset: () => {
        setMessage("");
      }
    };
  }, []);

  const me = useMe();
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");

  function handleMessageChange(e: ChangeEvent<HTMLInputElement>): void {
    setMessage(e.target.value);
  }


  function handleSendClick(): void {
    if (message.trim().length == 0) {
      return;
    }
    try {
      onSend({ message });
      inputRef.current?.focus();
    } catch (e) {
      console.warn(e);
    }
  }

  function handleSendKeyDown(e: KeyboardEvent): void {
    // prevent double pressing error
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  }

  return (
    <Row px={1.5} pl={2.5} py={0.5}>
      <InputBase
        ref={inputRef}
        value={message}
        onChange={handleMessageChange}
        fullWidth
        placeholder="메시지를 입력해주세요.."
        multiline
        maxRows={4}
        autoComplete="off"
        onKeyDown={handleSendKeyDown}
      />
      {/* <Fab
        size='small'
        color='primary'
        aria-label='send message'
        onClick={handleSendClick}
      > */}
      <IconButton
        color='primary'
        disabled={message.trim().length == 0}
        aria-label='send message'
        onClick={handleSendClick}
      >
        <SendIcon fontSize='small'/>
      </IconButton>
      {/* </Fab> */}
    </Row>
  );
});

// export function ChatInput({
//   onSend,
// }: ChatInputProps): JSX.Element {
//   const [message, setMessage] = useState<string>("");

//   function handleMessageChange(e: ChangeEvent<HTMLInputElement>): void {
//     setMessage(e.target.value);
//   }

//   return (
//     <Row px={1} py={0.5}>
//       <InputBase
//         value={message}
//         onChange={handleMessageChange}
//         fullWidth
//         placeholder="메시지를 입력해주세요.."
//         multiline
//         maxRows={4}
//         autoComplete="off"
//       />
//       <Fab
//         size='small'
//         color='primary'
//         aria-label='send message'
//       >
//         <SendIcon fontSize='small'/>
//       </Fab>
//     </Row>
//   );
// }