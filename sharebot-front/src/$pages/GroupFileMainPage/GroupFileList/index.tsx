"use client";
import React, { useEffect, Fragment } from "react";
import { useListData } from "@/hooks/ListData";
import { LoadingBox, ErrorBox, LoadingIndicator } from "@/components/$statusTools";
import { useAlertDialog } from "@/hooks/dialogs/ConfirmDialog";
import { useSnackbar } from "@/hooks/Snackbar";
import { GroupFileItem } from "@/components/GroupFileItem";
import { Masonry } from "@mui/lab";
import * as GroupFileApi from "@/apis/group_files";
import { ViewObserver } from "@/ui/tools/ViewObserver";
import { CreateGroupFileButton } from "./CreateGroupFileButton";
import { buildImgUrl } from "@/utils/media";
import type { GroupFileT, ListGroupFileOptionT } from "@/types";


export function GroupFileList(): JSX.Element {
  const { data: groupFiles$, actions: groupFilesAct } = useListData({
    listFn: GroupFileApi.list,
  });

  const { showAlertDialog } = useAlertDialog();
  const { enqueueSnackbar } = useSnackbar();

  const listOpt: ListGroupFileOptionT = {};

  useEffect(() => {
    groupFilesAct.load(listOpt);
  }, []);


  function handleLoaderDetect(): void {
    groupFilesAct.refill();
  }


  function handleGroupFileCreated(groupFile: GroupFileT): void {
    groupFilesAct.splice(0, 0, groupFile);
  }

  function handleGroupFileClick(groupFile: GroupFileT): void {
    const fileUrl = buildImgUrl(null, groupFile.path);
    window.open(fileUrl, "_blank");
  }

  async function handleGroupFileDelete(groupFile: GroupFileT): Promise<void> {
    const isOk = await showAlertDialog({
      body: `파일 ${groupFile.name} 을 삭제하시겠어요?`,
      useOk: true,
      useCancel: true,
    });
    if (!isOk) {
      return;
    }
    try {
      const removed = await GroupFileApi.remove(groupFile.id);
      enqueueSnackbar(`파일 ${removed.name} 을 삭제했어요.`, { variant: "success" });
      groupFilesAct.filterItems((item) => (item.id == removed.id));
    } catch (e) {
      console.warn(e);
      enqueueSnackbar(`파일 ${groupFile.name} 을 삭제할 수 없어요.`, { variant: "error" });
    }
  }

  async function handleGroupFileTextView(groupFile: GroupFileT): Promise<void> {
    await showAlertDialog({
      title: groupFile.name,
      body: groupFile.content ?? "내용이 없습니다.",
      useOk: true,
    });
  }


  const { status, data: groupFiles, appendingStatus } = groupFiles$;


  if (status == "init" || status == "loading") {
    return <LoadingBox/>;
  }

  if (status == "error") {
    return <ErrorBox/>;
  }


  return (
    <Masonry spacing={2} columns={{ xs: 2, sm: 3, md: 4 }}>
      <CreateGroupFileButton
        onCreated={handleGroupFileCreated}
      />

      {groupFiles.map((groupFile) => (
        <Fragment key={groupFile.id}>
          <GroupFileItem
            groupFile={groupFile}
            onClick={() => handleGroupFileClick(groupFile)}
            onDeleteClick={() => handleGroupFileDelete(groupFile)}
            onTextViewClick={() => handleGroupFileTextView(groupFile)}
          />
        </Fragment>
      ))}

      <ViewObserver
        onDetect={handleLoaderDetect}
        monitoringArgs={[groupFiles]}
      >
        <div
          style={{
            visibility: appendingStatus == "loading" ? "visible" : "hidden",
          }}
        >
          <LoadingIndicator/>
        </div>
      </ViewObserver>

    </Masonry>
  );
}