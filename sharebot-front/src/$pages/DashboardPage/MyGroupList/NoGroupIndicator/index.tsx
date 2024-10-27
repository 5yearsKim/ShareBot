"use client";
import React, { useEffect, Fragment } from "react";
import Image from "next/image";
import { Col, Box, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import * as GroupApi from "@/apis/groups";
import { Card, CardActionArea } from "@mui/material";
// import { Masonry } from "@mui/lab";
import { GroupItem } from "@/components/GroupItem";
import { useListData } from "@/hooks/ListData";
import type { GroupT, ListGroupOptionT } from "@/types";

type NoGroupIndicatorProps = {
  onGroupClick: (group: GroupT) => void;
}

export function NoGroupIndicator({ onGroupClick }: NoGroupIndicatorProps): JSX.Element {

  const { data: groups$, actions: groupsAct } = useListData({
    listFn: GroupApi.list,
  });

  const listOpt: ListGroupOptionT = {
    $secret: true,
    protection: "public",
  };

  useEffect(() => {
    groupsAct.load(listOpt);
  }, []);


  return (
    <Col alignItems='center'>
      <Box
        position='relative'
        width={100}
        height={100}
        borderRadius={"50%"}
        overflow={"hidden"}
      >
      </Box>

      <Gap y={2}/>

      <Box maxWidth={400}>
        <Txt variant="subtitle2" textAlign='center' sx={{ wordBreak: "keep-all" }} >아직 내가 가입한 프로젝트가 없어요. 셰어봇이 어떤 서비스인지 아래 프로젝트에서 테스트 해보실래요? </Txt>
      </Box>

      <Gap y={4} />

      {groups$.data.map((item) => (
        <Fragment key={item.id}>
          <Card sx={{ minWidth: 200, maxWidth: 400, borderRadius: 3 }}>
            <CardActionArea sx={{ py: 1, px: 2 }} onClick={() => onGroupClick(item)}>
              <GroupItem group={item} />
            </CardActionArea>
          </Card>
        </Fragment>
      ))}
    </Col>
  );
}