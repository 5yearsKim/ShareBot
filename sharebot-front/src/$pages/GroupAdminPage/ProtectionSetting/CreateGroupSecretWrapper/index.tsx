"use client";
import React, { useState, ReactNode } from "react";
import { Dialog } from "@mui/material";
import { Box } from "@/ui/layouts";
import * as GroupSecretApi from "@/apis/group_secrets";
import { useSnackbar } from "@/hooks/Snackbar";
import { GroupSecretEditor } from "@/components/GroupSecretEditor";
import type { GroupT, GroupSecretT, GroupSecretFormT } from "@/types";

// upsert
type CreateGroupSecretWrapperProps = {
  groupSecret?: GroupSecretT
  group: GroupT
  children: ReactNode
  onCreated?: (groupSecret: GroupSecretT) => void
}

export function CreateGroupSecretWrapper({
  groupSecret,
  group,
  children,
  onCreated,
}: CreateGroupSecretWrapperProps): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);

  function handleEditorCancel(): void {
    setOpen(false);
  }

  async function handleEditorApply(form: GroupSecretFormT): Promise<void> {
    try {
      const created = await GroupSecretApi.create(form);
      if (onCreated) {
        onCreated(created);
      }
      enqueueSnackbar("비밀번호가 설정되었습니다.", { variant: "success" });
      setOpen(false);
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("비밀번호 설정에 실패했습니다.", { variant: "error" });

    }
  }

  return (
    <>
      <Box onClick={() => setOpen(true)}>
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box p={2} minWidth={300}>
          <GroupSecretEditor
            groupSecret={groupSecret}
            groupId={group.id}
            onCancel={handleEditorCancel}
            onApply={handleEditorApply}
          />
        </Box>
      </Dialog>
    </>
  );
}