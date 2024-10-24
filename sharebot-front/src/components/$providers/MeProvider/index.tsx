"use client";
import { useEffect, ReactNode } from "react";
import { useGroupRouter } from "@/system/navigator";
import { useGroup$ } from "@/stores/GroupStore";
import { useUserActions } from "@/stores/UserStore";
import { useAccount$ } from "@/stores/AccountStore";
import { useUser$ } from "@/stores/UserStore";

type MeProviderProps = {
  children: ReactNode
}

export function MeProvider({ children }: MeProviderProps) {
  const account$ = useAccount$();
  const group$ = useGroup$();
  const user$ = useUser$();
  const userAct = useUserActions();
  const groupRouter = useGroupRouter();

  const group = group$.data!.group;

  useEffect(() => {
    // if account is not logged in, reset user
    if (account$.status !== "loggedIn" || group$.status !== "loaded") {
      userAct.reset();
    } else if (user$.status != "loaded" ) {
      userAct.access(group.id);
    } else if (user$.data.me?.group_id !== group.id) { // if change group detected -> refresh user
      userAct.reset();
      userAct.access(group.id);
    }
  }, [account$.data?.account.id, group.id]);

  useEffect(() => {
    if (user$.status == "loaded") {
      const me = user$.data.me;
      if (me) {
        // userAct.loadMuter(me.group_id);
        userAct.loadAdmin(me.group_id);
      } else { // me is null
        groupRouter.replace("/join");
      }
    }
  }, [user$.status, user$.data?.me?.id]);

  // if (user$.status === "loading") {
  //   return <>loading user..</>;
  // }

  // if (user$.status === "error") {
  //   return <>error user..</>;
  // }

  // if (user$.status == "loaded" && user$.data.me == null) {
  //   return <>user need to join.. redirecting..</>;
  // }


  return children;
}