import React from "react";
import { Avatar } from "@mui/material";
import { buildImgUrl } from "@/utils/media";
import type { GroupT } from "@/types";

type GroupAvatarProps = {
  group: GroupT;
  size?: number|string;
}

export function GroupAvatar({
  group,
  size
}: GroupAvatarProps): JSX.Element {
  return (
    <Avatar
      variant="rounded"
      src={group.avatar_path ? buildImgUrl(null, group.avatar_path) : "/images/sharebot.png"}
      sx={{
        width: size,
        height: size,
      }}
    />
  );
}