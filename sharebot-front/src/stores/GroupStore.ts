"use client";

import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import type { GroupT } from "@/types/Group";
import * as GroupApi from "@/apis/groups";

type GroupDataT = {
  group: GroupT
  tab: number
}

interface GroupStateT {
  status: ProcessStatusT
  data?: GroupDataT
  fromCustom?: boolean
}

const groupState = atom<GroupStateT>({
  key: "groupState",
  default: {
    status: "loading", // start from loading to prevent flash
    data: undefined,
    fromCustom: false,
  }
});

export function useGroup(): GroupT {
  const group$ = useRecoilValue(groupState);
  return group$.data!.group;
}

export function useGroup$(): GroupStateT {
  const group$ = useRecoilValue(groupState);
  return group$;
}

export function useGroupActions() {
  const set = useSetRecoilState(groupState);

  function patch(val: Partial<GroupStateT>) {
    set((prev) => ({ ...prev, ...val }));
  }

  function patchData(newData: Partial<GroupDataT>): void {
    set((prev) => ({ ...prev, data: prev.data ? { ...prev.data, ...newData } : undefined }));
  }

  async function initFromKey(key: string, opt?: {onSuccess: (group: GroupT) =>void, onFail: (e: any) => void}): Promise<void> {
    try {
      patch({ status: "loading" });
      const { data: group } = await GroupApi.getByKey(key, { $tags: true, $secret: true });
      patch({ status: "loaded", data: { group, tab: 0 } });
      if (opt?.onSuccess) {
        opt.onSuccess(group);
      }
    } catch (e) {
      patch({ status: "error", data: undefined });
      if (opt?.onFail) {
        opt.onFail(e);
      }
    }
  }

  return {
    set,
    patch,
    patchData,
    initFromKey,
  };
}