"use client";
import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Col, Row, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import type { GroupSecretT, GroupSecretFormT } from "@/types";

type GroupSecretEditorProps = {
  groupId: idT
  groupSecret?: GroupSecretT
  onCancel?: () => void
  onApply?: (form: GroupSecretFormT) => any
}

export function GroupSecretEditor({
  groupId,
  groupSecret,
  onCancel,
  onApply,
}: GroupSecretEditorProps): JSX.Element {
  const [pw, setPw] = useState<string>("");
  const [hint, setHint] = useState<string>("");

  useEffect(() => {
    if (groupSecret) {
      setPw(groupSecret.password);
      setHint(groupSecret.hint ?? "");
    }
  }, []);


  function handleApplyClick(): void {
    if (onApply) {
      onApply({
        group_id: groupId,
        password: pw,
        hint,
      });
    }
  }

  return (
    <Col>
      <TextField
        label='비밀번호'
        // type='password'
        variant='standard'
        autoComplete="off"
        autoCapitalize="off"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <TextField
        label='비밀번호 힌트'
        variant='standard'
        value={hint}
        onChange={(e) => setHint(e.target.value)}
        multiline
        maxRows={3}
      />

      <Gap y={2}/>

      <Row
        justifyContent='flex-end'
      >
        {onCancel && (
          <Button
            onClick={onCancel}
          >
            취소
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleApplyClick}
        >
          {groupSecret ? "수정" : "적용"}
        </Button>
      </Row>
    </Col>
  );
}