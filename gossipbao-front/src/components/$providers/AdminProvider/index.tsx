"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { LoadingBox, ErrorBox } from "@/components/$statusTools";
import { useAccount$, useAccountActions } from "@/stores/AccountStore";
import * as AdminApi from "@/apis/admins";

type AdminProviderProps = {
  children: ReactNode
}

export function AdminProvider({ children }: AdminProviderProps): ReactNode {
  const [status, setStatus] = useState<ProcessStatusT>("init");
  const account$ = useAccount$();
  const accountAct = useAccountActions();

  useEffect(() => {
    loadAdmin();
  }, []);

  async function loadAdmin(): Promise<void> {
    try {
      setStatus("loading");
      const { data: admin } = await AdminApi.getMe();
      accountAct.patchData({ admin: admin });
      setStatus("loaded");
    } catch (e) {
      console.warn(e);
      setStatus("error");
    }
  }

  if (status === "loading" || status === "init") {
    return (
      <LoadingBox height="60vh"/>
    );
  }

  if (status === "error" || !account$.data?.admin) {
    return (
      <ErrorBox height='60vh' message="관리자만 접근 가능합니다." showHome/>
    );
  }


  return (
    <>
      {children}
    </>
  );
}