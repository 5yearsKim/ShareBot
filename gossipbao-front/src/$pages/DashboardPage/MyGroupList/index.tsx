"use client";

import React, { useEffect, Fragment } from "react";
import { useListData } from "@/hooks/ListData";
import { LoadingBox, ErrorBox, LoadingIndicator } from "@/components/$statusTools";
import { GroupItem, GroupItemCard } from "@/components/GroupItem";
import { NoGroupIndicator } from "./NoGroupIndicator";
import * as GroupApi from "@/apis/groups";
import { Masonry } from "@mui/lab";
import { ViewObserver } from "@/ui/tools/ViewObserver";
import type { ListGroupOptionT, GroupT } from "@/types";


type MyGroupListProps = {
  onGroupClick: (group: GroupT) => void;
}

export function MyGroupList({
  onGroupClick,
}: MyGroupListProps): JSX.Element {
  const { data: groups$, actions: groupsAct } = useListData({
    listFn: GroupApi.list,
  });

  const listOpt: ListGroupOptionT = {
    $secret: true,
    $tags: true,
    joined: "only",
    protection: "private",
  };

  useEffect(() => {
    groupsAct.load(listOpt);
  }, []);

  function handleLoaderDetect(): void {
    groupsAct.refill();
  }

  const { status, data: groups, appendingStatus } = groups$;


  if (status == "init" || status == "loading") {
    return <LoadingBox/>;
  }

  if (status == "error") {
    return <ErrorBox/>;
  }

  if (status == "loaded" && groups.length === 0) {
    return <NoGroupIndicator onGroupClick={onGroupClick}/>;
  }

  return (
    <Masonry spacing={2} columns={{ xs: 1, sm: 2, md: 3 }}>
      {groups.map((group) => (
        <Fragment key={group.id}>
          <GroupItemCard onClick={() => onGroupClick(group)}>
            <GroupItem group={group}/>
          </GroupItemCard>
        </Fragment>
      ))}
      <ViewObserver
        onDetect={handleLoaderDetect}
        monitoringArgs={[groups]}
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