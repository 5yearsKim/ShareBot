"use client";
import React, { useState, useEffect } from "react";
import { InitBox, LoadingBox, ErrorBox } from "@/components/$statusTools";
import * as GroupApi from "@/apis/groups";
import type { GroupT } from "@/types";


export function GroupStartButton({ groupKey }: {groupKey: string}): JSX.Element {
  const [status, setStatus] = useState<ProcessStatusT>("init");
  const [group, setGroup] = useState<GroupT | null>(null);

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      setStatus("loading");
      const { data: group } = await GroupApi.getByKey(groupKey);
      setGroup(group);
      setStatus("loaded");
    } catch (e) {
      setStatus("error");
      console.warn(e);
    }
  }

  if (status == "init") {
    return <InitBox />;
  }

  if (status == "loading") {
    return <LoadingBox />;
  }

  if (status == "error") {
    return <ErrorBox />;
  }

  return (
    <_GroupStartButton
      group={group!}
    />
  );
}

type _GroupStartButtonProps = {
  group: GroupT
}

export function _GroupStartButton({ group }: _GroupStartButtonProps): JSX.Element {
  // not implemented yet
  return (
    <div>
      {group.name}
    </div>
  );
}