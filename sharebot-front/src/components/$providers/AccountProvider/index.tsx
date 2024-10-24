"use client";
import { useEffect, ReactNode } from "react";
import { accountTH } from "@/system/token_holders";
import { useAccountActions } from "@/stores/AccountStore";

type AccountProviderProps = {
  children: ReactNode
}

export function AccountProvider({ children }: AccountProviderProps): ReactNode {
  const accountAct = useAccountActions();

  useEffect(() => {
    const tokenInfo = accountTH.get();

    if (!tokenInfo) {
      accountAct.set({ status: "loggedOut", data: undefined });
    } else {
      if (tokenInfo.meta?.account) {
        accountAct.set({ status: "loggedIn", data: { account: tokenInfo.meta.account } });
        accountAct.refreshAccount({ skipLoading: true });
      } else {
        accountAct.refreshAccount();
      }
    }

  }, []);


  return children;
}