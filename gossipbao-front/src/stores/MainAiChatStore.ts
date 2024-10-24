"use client";

import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import * as AiChatApi from "@/apis/ai_chats";
import type { AiChatT } from "@/types";

type MainAiChatDataT = {
  chat: AiChatT
}

interface MainAiChatStateT {
  status: ProcessStatusT
  data?: MainAiChatDataT
}

const mainAiChatState = atom<MainAiChatStateT>({
  key: "mainAiChatState",
  default: {
    status: "loading", // start from loading to prevent flash
    data: undefined,
  }
});


export function useMainAiChat$(): MainAiChatStateT {
  const mainAiChat$ = useRecoilValue(mainAiChatState);
  return mainAiChat$;
}

export function useMainAiChatActions() {
  const set = useSetRecoilState(mainAiChatState);

  function patch(val: Partial<MainAiChatStateT>) {
    set((prev) => ({ ...prev, ...val }));
  }

  function patchData(newData: Partial<MainAiChatDataT>): void {
    set((prev) => ({ ...prev, data: prev.data ? { ...prev.data, ...newData } : undefined }));
  }

  async function loadInitialChat(): Promise<void> {
    try {
      patch({ status: "loading" });
      const chat = await AiChatApi.findOrCreate();
      // setChat(chat);
      patch({ status: "loaded", data: { chat: chat } });
    } catch (e) {
      console.warn(e);
      patch({ status: "error", data: undefined });
    }
  }


  return {
    set,
    patch,
    patchData,
    loadInitialChat,
  };
}