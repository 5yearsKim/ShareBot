"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { LockIcon, EditIcon, DeleteOlIcon } from "@/ui/icons";
import { Row, Col, Expand, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import * as GroupSecretApi from "@/apis/group_secrets";
import { useSnackbar } from "@/hooks/Snackbar";
import { useAlertDialog } from "@/hooks/dialogs/ConfirmDialog";
import { CreateGroupSecretWrapper } from "./CreateGroupSecretWrapper";
import type { GroupT, GroupSecretT } from "@/types";

type ProtectionSettingProps = {
  group: GroupT
}

export function ProtectionSetting({
  group,
}: ProtectionSettingProps): JSX.Element {
  const { showAlertDialog } = useAlertDialog();
  const { enqueueSnackbar } = useSnackbar();

  const [status, setStatus] = useState<ProcessStatusT>("init");
  const [groupSecret, setGroupSecret] = useState<GroupSecretT|null>(null);

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      setStatus("loading");
      const { data: groupSecret } = await GroupSecretApi.getByGroup(group.id);
      setGroupSecret(groupSecret);
      setStatus("loaded");
    } catch (e) {
      console.warn(e);
      setStatus("error");
    }
  }

  function handleGroupSecretCreated(groupSecret: GroupSecretT): void {
    setGroupSecret(groupSecret);
  }

  async function handleDeleteGroupSecret(): Promise<void> {
    const isOk = await showAlertDialog({
      title: "비밀번호 삭제",
      body: "비밀번호를 삭제하시겠습니까?",
      useCancel: true,
      useOk: true
    });
    if (!isOk) {
      return;
    }
    try {
      await GroupSecretApi.deleteByGroup(group.id);
      setGroupSecret(null);
      enqueueSnackbar("비밀번호가 삭제되었습니다.", { variant: "success" });
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("비밀번호 삭제에 실패했습니다.", { variant: "error" });

    }
  }

  if (status === "loading" || status === "init") {
    return <p>로딩 중...</p>;
  }
  if (status === "error") {
    return <p>에러 발생</p>;
  }
  if (groupSecret == null) {
    return (
      <Row width='100%'>
        <Txt color='vague.main'>현재 설정된 비밀번호가 없어요.</Txt>
        <Expand/>

        <CreateGroupSecretWrapper
          group={group}
          onCreated={handleGroupSecretCreated}
        >
          <Button
            startIcon={<LockIcon/>}
            variant="outlined"
          >
            그룹 비밀번호 설정
          </Button>
        </CreateGroupSecretWrapper>
      </Row>
    );
  }

  return (
    <Col>
      <Txt color='vague.main'>그룹에 가입하려면 비밀번호를 입력해야해요.</Txt>
      <Gap y={1}/>
      <Row>
        <div>
          <p><b>비밀번호 힌트:</b> {groupSecret.hint}</p>
          <p><b>비밀번호:</b> {groupSecret.password}</p>
        </div>
      </Row>
      <Row justifyContent='flex-end'>
        <Button
          startIcon={<DeleteOlIcon/>}
          onClick={handleDeleteGroupSecret}
          color='error'
        >
          비밀번호 삭제
        </Button>
        <CreateGroupSecretWrapper
          groupSecret={groupSecret}
          group={group}
          onCreated={handleGroupSecretCreated}
        >
          <Button
            startIcon={<EditIcon/>}
            variant="outlined"
          >
            비밀번호 수정
          </Button>
        </CreateGroupSecretWrapper>
      </Row>
    </Col>
  );
}