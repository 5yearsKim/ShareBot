import React, { ReactNode } from "react";
import { Col, Row, Gap, Expand } from "@/ui/layouts";
import { Txt, EllipsisTxt } from "@/ui/texts";
import { LockIcon } from "@/ui/icons";
import { Card, CardActionArea } from "@mui/material";
import { GroupAvatar } from "@/ui/tools/Avatar";
import { GroupTagItem } from "@/components/GroupTagItem";
import type { GroupT } from "@/types";


type GroupItemProps = {
  group: GroupT
}

export function GroupItem({ group }: GroupItemProps): JSX.Element {
  return (
    <Col alignItems='start'>
      <Row width='100%'>
        <GroupAvatar group={group} size={50}/>
        <Gap x={1.5}/>
        <Col>
          <EllipsisTxt
            variant='subtitle1'
            fontWeight={700}
            maxLines={1}
          >
            {group.name}
          </EllipsisTxt>
          <Txt fontSize={12} color='vague.main'>@{group.key}</Txt>
        </Col>

        <Expand/>

        <Row>
          {(group.tags ?? []).map((tag) => (
            <GroupTagItem key={tag.id} item={tag} />
          ))}
          {(group.secret && (
            <LockIcon sx={{ color: "vague.dark", fontSize: 15, alignSelf: "start" }}/>
          ))}
        </Row>
      </Row>
      <Gap y={2}/>
      <Txt variant="body1">{group.description ?? "(설명 없음)"}</Txt>
    </Col>
  );
}


type GroupItemCardProps = {
  children: ReactNode
  onClick?: () => void
}

export function GroupItemCard({
  children,
  onClick,
}: GroupItemCardProps): ReactNode {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
      <CardActionArea sx={{ py: 2, px: 2 }} onClick={onClick}>
        {children}
      </CardActionArea>
    </Card>

  );
}