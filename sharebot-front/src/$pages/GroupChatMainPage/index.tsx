import React from "react";
import { Container, Box } from "@/ui/layouts";
import { NAV_HEIGHT } from "@/ui/global";
import { ChatBox } from "@/components/ChatBox";


export function GroupChatMainPage(): JSX.Element {

  return (
    <Box
      height={`calc(100vh - ${NAV_HEIGHT}px - 60px)`}
    >
      <ChatBox />
    </Box>
  );
}