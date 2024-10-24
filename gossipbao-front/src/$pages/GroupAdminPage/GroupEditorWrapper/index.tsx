"use client";

import React, { ReactNode, useState } from "react";
import { Col, Box } from "@/ui/layouts";
import { Dialog } from "@mui/material";
import { GroupForm } from "@/components/GroupForm";
import * as GroupApi from "@/apis/groups";
import * as XGroupGroupTagApi from "@/apis/x_group_group_tag";
import { useSnackbar } from "@/hooks/Snackbar";
import type { GroupT, GroupFormT, GroupTagT } from "@/types";

type GroupEditorWrapperProps = {
  children: ReactNode
  group: GroupT
  onGroupUpdated: (group: GroupT) => void
}

export function GroupEditorWrapper({
  group,
  children,
  onGroupUpdated,
}: GroupEditorWrapperProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  function handleOpen(): void {
    setIsOpen(true);
  }

  function handleClose(): void {
    setIsOpen(false);
  }

  async function handleSubmit(form: GroupFormT, xData: {tags?: GroupTagT[]}): Promise<void> {

    try {
      setIsSubmitting(true);
      const updated = await GroupApi.update(group.id, form);

      const { tags } = xData;
      if (tags) {
        await XGroupGroupTagApi.resetByGroup(group.id);
        await Promise.all(tags.map((tag) => XGroupGroupTagApi.create({
          group_id: group.id,
          tag_id: tag.id,
        })));
      }
      onGroupUpdated({ ...updated, tags: tags });
      enqueueSnackbar("그룹이 수정되었습니다.", { variant: "success" });
      handleClose();
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("그룹 수정에 실패했습니다.", { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Box onClick={handleOpen}>
        {children}
      </Box>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <Col p={2}>
          <GroupForm
            group={group}
            isSubmitting={isSubmitting}
            onCancel={handleClose}
            onSubmit={handleSubmit}
          />

        </Col>
      </Dialog>
    </>
  );
}