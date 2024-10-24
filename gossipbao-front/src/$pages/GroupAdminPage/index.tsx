"use client";
import React from "react";
import { Button } from "@mui/material";
import { Container, Gap, Row } from "@/ui/layouts";
import { EditIcon, LockIcon, HomeIcon } from "@/ui/icons";
import { Txt } from "@/ui/texts";
import { GroupLink } from "@/system/navigator/GroupLink";
import { GroupItem } from "@/components/GroupItem";
import { useGroup, useGroupActions } from "@/stores/GroupStore";
import { GroupAdminProtector } from "./GroupAdminProtector";
import { GroupEditorWrapper } from "./GroupEditorWrapper";
import { ProtectionSetting } from "./ProtectionSetting";
import type { GroupT } from "@/types";


export function GroupAdminPage(): JSX.Element {
  const group = useGroup();
  const groupAct = useGroupActions();

  function handleGroupUpdated(group: GroupT): void {
    groupAct.patchData({ group });

  }

  return (
    <GroupAdminProtector>
      <Container rtlP>
        <Txt variant="h4">그룹 관리 페이지</Txt>

        <Gap y={4} />

        <Txt variant="h5">그룹 정보</Txt>

        <Gap y={2} />

        <GroupItem group={group} />

        <Gap y={2}/>

        <Row justifyContent='flex-end'>
          <GroupEditorWrapper
            group={group}
            onGroupUpdated={handleGroupUpdated}
          >
            <Button
              variant="outlined"
              startIcon={<EditIcon/>}
            >
              수정하기
            </Button>
          </GroupEditorWrapper>
        </Row>

        <Gap y={2}/>
        <Txt variant="h5">그룹 제한</Txt>
        <Gap y={2}/>

        <ProtectionSetting
          group={group}
        />

        <Gap y={8}/>

        <Row justifyContent='center' >
          <GroupLink href='/'>
            <Button
              startIcon={<HomeIcon/>}
              variant='contained'
            >
              홈으로 돌아가기
            </Button>
          </GroupLink>
        </Row>
      </Container>
    </GroupAdminProtector>
  );
}