"use client";
import React, { useEffect, Fragment } from "react";
import { useListData } from "@/hooks/ListData";
import { LoadingBox, ErrorBox, LoadingIndicator } from "@/components/$statusTools";
import { Masonry } from "@mui/lab";
import * as GroupFileApi from "@/apis/group_files";
import { ViewObserver } from "@/ui/tools/ViewObserver";
import { CreateGroupFileButton } from "./CreateGroupFileButton";
import type { GroupFileT, ListGroupFileOptionT } from "@/types";


export function GroupFileList(): JSX.Element {
  const { data: groupFiles$, actions: groupFilesAct } = useListData({
    listFn: GroupFileApi.list,
  });

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
          <p>{groupFile.name}</p>

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