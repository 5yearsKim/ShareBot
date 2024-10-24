import React from "react";
import { LandingPage } from "@/$pages/LandingPage";

export default function Home({
  searchParams,
}: {
  searchParams?: {groupKey?: string}
}) {

  return (
    <LandingPage redirectGroupKey={searchParams?.groupKey} />
  );
}
