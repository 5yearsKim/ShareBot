"use client";
import React, { useEffect, Fragment } from "react";
import { Container, Gap, Col, Row } from "@/ui/layouts";
import { LoadingIndicator } from "@/components/$statusTools";
import { Txt } from "@/ui/texts";
import { AddIcon } from "@/ui/icons";
import { GroupTagItem } from "@/components/GroupTagItem";
import { Button } from "@mui/material";
import { useListData } from "@/hooks/ListData";
import * as GroupTagApi from "@/apis/group_tags";
import { ListView } from "@/ui/tools/ListView";
import { GroupTagAdder } from "./GroupTagAdder";
import { GroupTagDetail } from "./GroupTagDetail";
import type { ListGroupTagOptionT, GroupTagT } from "@/types";

export function GroupTagTab(): JSX.Element {
  const { data: groupTags$, actions: groupTagsAct } = useListData({
    listFn: GroupTagApi.list,
  });

  const listOpt: ListGroupTagOptionT = {
  };

  useEffect(() => {
    groupTagsAct.load(listOpt);
  }, []);

  const { data: groupTags, status } = groupTags$;

  function handleTagCreated(item: GroupTagT): void {
    groupTagsAct.load(listOpt);
  }

  function handleTagDeleted(item: GroupTagT): void {
    groupTagsAct.load(listOpt);
  }

  return (
    <Container rtlP>
      <Txt variant="h4">그룹 태그 설정</Txt>

      <Gap y={2} />

      <GroupTagAdder onCreated={handleTagCreated}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          태그 추가
        </Button>
      </GroupTagAdder>

      <Gap y={2} />

      {(status == "init" || status == "loading") && (
        <LoadingIndicator />
      )}

      {status == "error" && (
        <Txt>에러가 발생했습니다.</Txt>
      )}

      {status == "loaded" && groupTags.length == 0 && (
        <Txt>태그 없음.</Txt>
      )}

      {status == "loaded" && (
        <Row flexWrap='wrap'>
          <ListView
            data={groupTags}
            renderItem={(item) => (
              <Fragment key={item.id}>
                <GroupTagDetail onDeleted={handleTagDeleted} item={item}>
                  <GroupTagItem item={item}/>
                </GroupTagDetail>
              </Fragment>
            )}
            onLoaderDetect={() => {}}
          />
        </Row>
      )}

    </Container>
  );
}