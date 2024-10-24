"use client";
import React from "react";
import { useParams } from "next/navigation";
import { GroupTagTab } from "./tabs/GroupTagTab";


export function AdminTabPage(): JSX.Element {
  const { tab } = useParams();

  switch (tab) {
  case "group-tag":
    return <GroupTagTab/>;
  default:
    return <div>tab not defined</div>;
  }
}