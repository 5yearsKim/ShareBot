"use client";
import React, { useState } from "react";
import { Row } from "@/ui/layouts";
import { Tabs, Tab } from "@mui/material";

import { GroupFileMainPage } from "@/$pages/GroupFileMainPage";
import { GroupChatMainPage } from "@/$pages/GroupChatMainPage";
import { useGroup$, useGroupActions } from "@/stores/GroupStore";


export default function GroupMain() {
  const group$ = useGroup$();
  const groupAct = useGroupActions();

  function handleTabChange(e: React.SyntheticEvent, value: number): void {
    groupAct.patchData({ tab: value });
  }

  const tab = group$.data?.tab ?? 0;

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