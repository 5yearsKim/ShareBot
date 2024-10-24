"use client";

import React, { ReactNode } from "react";
import { ErrorBox } from "@/components/$statusTools";
import { useMeAdmin } from "@/stores/UserStore";

type GroupAdminProtectorProps = {
  children: ReactNode;
}

export function GroupAdminProtector({
  children,
}: GroupAdminProtectorProps): ReactNode {
  const admin = useMeAdmin();

  if (!admin) {
    return (
      <ErrorBox
        height="60vh"
        message="관리자만 접근 가능한 페이지에요."
        showHome
      />
    );
  }

  return (
    children
  );
}