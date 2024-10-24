"use client";
import React, { Fragment, useEffect } from "react";
import { Row } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { useListData } from "@/hooks/ListData";
import * as GroupTagApi from "@/apis/group_tags";
import { LoadingIndicator } from "@/components/$statusTools";
import { GroupTagItem } from "@/components/GroupTagItem";
import type { GroupTagT, ListGroupTagOptionT } from "@/types";


type GroupTagCandidateProps = {
  selected: GroupTagT|null
  withAll?: boolean
  onSelect: (item: GroupTagT|null) => void
}

export function GroupTagCandidate({
  selected,
  withAll,
  onSelect,
}: GroupTagCandidateProps): JSX.Element {

  const { data: groupTags$, actions: groupTagsAct } = useListData({
    listFn: GroupTagApi.list,
  });

  const listOpt: ListGroupTagOptionT = {};

  useEffect(() => {
    groupTagsAct.load(listOpt);
  }, []);

  function handleTagClick(item: GroupTagT|null): void {
    onSelect(item);
  }

  const { data: groupTags, status } = groupTags$;

  return (
    <Row
      flexWrap='wrap'
      overflow='scroll'
      width='100%'
      py={1}
      sx={{
        scrollbarWidth: "thin"
      }}
    >

      {(status == "init" || status == "loading") && (
        <LoadingIndicator size='1.5rem'/>
      )}

      {status == "error" && (
        <Txt variant="body2" color='vague.main'>태그를 로드할 수 없어요..</Txt>
      )}

      {status == "loaded" && (
        <Row columnGap={0.5} rowGap={0.5}>
          {withAll && (
            <GroupTagItem
              item={{ id: -1, created_at: new Date(), label: "전체", }}
              selected={selected == null}
              onClick={() => handleTagClick(null)}
            />
          )}


          {groupTags.map((item) => {
            const isSelected = item.id == selected?.id;
            return (
              <Fragment key={item.id}>
                <GroupTagItem
                  item={item}
                  selected={isSelected}
                  onClick={() => handleTagClick(item)}
                />
              </Fragment>
            );
          })}
        </Row>

      )}


    </Row>
  );
}