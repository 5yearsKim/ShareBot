"use client";
import React, { ReactNode, CSSProperties } from "react";
import Link, { LinkProps } from "next/link";
import { useParams } from "next/navigation";
import P from "path";

interface GroupLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  style?: CSSProperties;
}


export function GroupLink({
  children,
  href,
  className,
  style,
  ...linkProps
}: GroupLinkProps) {

  const { groupKey, locale } = useParams();

  let to = href;
  if (groupKey) {
    to = P.join(`/g/${groupKey}`, href);
  }
  if (locale) {
    to = P.join(`/${locale}`, to);
  }

  return (
    <Link {...linkProps} className={className} style={style} href={to}>
      {children}
    </Link>
  );
}