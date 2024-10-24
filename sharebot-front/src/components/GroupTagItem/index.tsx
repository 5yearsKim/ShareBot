import React from "react";
import { Chip } from "@mui/material";
import type { GroupTagT } from "@/types/GroupTag";

type GroupTagItemProps = {
  item: GroupTagT
  selected?: boolean
  size?: "small" | "medium"
  onClick?: () => void

}

export function GroupTagItem({
  item,
  selected,
  size,
  onClick,
}: GroupTagItemProps): JSX.Element {
  return (
    <Chip
      label={item.label}
      color={selected ? "primary" : "default"}
      size={size}
      onClick={onClick}
    />
  );
}