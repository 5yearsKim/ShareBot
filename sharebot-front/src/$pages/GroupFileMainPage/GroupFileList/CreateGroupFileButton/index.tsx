"use client";
import React, { useRef, } from "react";
import * as GroupFileApi from "@/apis/group_files";
import { Clickable } from "@/ui/tools/Clickable";
import * as GroupApi from "@/apis/groups";
import { useSnackbar } from "@/hooks/Snackbar";
import { useMe } from "@/stores/UserStore";
import { useGroup } from "@/stores/GroupStore";
import type { GroupFileT, GroupFileFormT } from "@/types";


type CreateGroupFileButtonProps = {
  onCreated: (groupFile: GroupFileT) => any
}

export function CreateGroupFileButton(props: CreateGroupFileButtonProps): JSX.Element {
  const {
    onCreated
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const me = useMe();
  const group = useGroup();


  function handleCreateButtonClick(e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault();
    e.stopPropagation();
    if (!inputRef) {
      return;
    }
    inputRef.current!.click();
  }


  async function handleInputFileChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = e.target.files;
    if (!files || !files.length) {
      return;
    }
    const file = files[0];
    await handleFileUpload(file);
  }

  async function handleFileUpload(file: File): Promise<void> {
    try {
      const { key } = await GroupApi.uploadFile(file);

      const form: GroupFileFormT = {
        user_id: me!.id,
        group_id: group.id,
        name: file.name,
        path: key,
        mime_type: file.type,
      };

      const created = await GroupFileApi.create(form);

      onCreated(created);
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("이미지를 업로드 할 수 없어요.", { variant: "error" });
    }
  }


  return (
    <>
      <input
        ref={inputRef}
        hidden
        accept='application/pdf'
        multiple={false}
        type='file'
        onChange={handleInputFileChange}
        onClick={(e: any): void => {
          e.target.value = null;
        }}
      />

      <Clickable
        onClick={handleCreateButtonClick}
      >
        <div
        >
          + create file
        </div>
      </Clickable>
    </>
  );
}