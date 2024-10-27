"use client";
import React, { useState } from "react";
import { Row } from "@/ui/layouts";
import { Tabs, Tab } from "@mui/material";

import { GroupFileMainPage } from "@/$pages/GroupFileMainPage";
import { GroupChatMainPage } from "@/$pages/GroupChatMainPage";


export default function GroupMain() {
  const [tab, setTab] = useState<number>(0);

  function handleTabChange(e: React.SyntheticEvent, value: number): void {
    setTab(value);
  }

  return (
    <div>
      <Row
        justifyContent='center'
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          aria-label="basic tabs example"
        >
          <Tab label="파일 관리"/>
          <Tab label="AI 채팅" />

        </Tabs>
      </Row>

      { tab === 0 && (
        <GroupFileMainPage/>
      )}

      {tab === 1 && (
        <GroupChatMainPage/>
      )}


    </div>
  );
}