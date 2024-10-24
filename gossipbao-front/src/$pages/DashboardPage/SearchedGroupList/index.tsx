"use client";
import React, {
  Fragment,
  useState, useEffect, useCallback,
} from "react";
import { LoadingIndicator } from "@/components//$statusTools";
import { GroupItem, GroupItemCard } from "@/components/GroupItem";
import { Masonry } from "@mui/lab";
import { Box, Row, Col, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { CloseIcon } from "@/ui/icons";
import * as GroupApi from "@/apis/groups";
import { debounce } from "@mui/material/utils";
import type { GroupT, GroupTagT, ListGroupOptionT } from "@/types";

type SearchedGroupListProps = {
  query: string
  tag: GroupTagT | null;
  onGroupClick: (group: GroupT) => void;
}

export function SearchedGroupList({
  query,
  tag,
  onGroupClick,
}: SearchedGroupListProps): JSX.Element {
  const {
    status: searchStatus,
    groupCand,
  } = useGroupSearch({ query, tag });


  // if (query == "" ) {
  //   return <></>;
  // }

  if (searchStatus === "loading") {
    return <LoadingIndicator size='2rem'/>;
  }

  if (searchStatus === "loaded" && groupCand.length === 0) {
    return (
      <Row justifyContent='center'>
        <CloseIcon sx={{ color: "vague.main" }}/>
        <Gap x={1}/>
        <Txt variant='body1' color='vague.main'>검색된 그룹이 없어요.</Txt>
      </Row>
    );
  }

  return (
    <Masonry spacing={2} columns={{ xs: 1, sm: 2, md: 3 }}>
      {groupCand.map((item) => (
        <Fragment key={item.id}>
          <GroupItemCard onClick={() => onGroupClick(item)}>
            <GroupItem group={item} />
          </GroupItemCard>
        </Fragment>
      ))}
    </Masonry>
  );
}


export function useGroupSearch({ query, tag }: { query: string, tag: GroupTagT|null }) {
  const [status, setStatus] = useState<ProcessStatusT>("init");
  const [groupCand, setGroupCand] = useState<GroupT[]>([]);

  useEffect(() => {
    if (false) {
    // if (query.length == 0 && tag == null) {
    //   setStatus("init");
    //   setGroupCand([]);
    } else {
      setStatus("loading");
      bringCandidates({ query, tag });
    }
  }, [query, tag?.id]);

  const bringCandidates = useCallback(
    debounce(async (opt: {query: string, tag: GroupTagT|null}) => {
      const { query, tag } = opt;

      const listOpt: ListGroupOptionT = {
        $tags: true,
        $secret: true,
        search: query.length > 0 ? query : undefined,
        tagId: tag?.id,
        joined: query.length > 0 ? undefined : "except",
        // protection: 'private',
      };
      try {
        setStatus("loading");
        const { data: fetched } = await GroupApi.list(listOpt);
        setStatus("loaded");
        setGroupCand(fetched);
      } catch (e) {
        setStatus("error");
      }
    }, 500),
    [],
  );

  function reset(): void {
    setStatus("init");
    setGroupCand([]);
  }

  return {
    status,
    groupCand,
    reset,
  };
}
