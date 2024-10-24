"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextField, InputAdornment, Button } from "@mui/material";
import { Navbar } from "@/components/Navbar";
import { NAV_HEIGHT } from "@/ui/global";
import { NavbarLayout } from "@/components/$layouts/NavbarLayout";
import { useSnackbar } from "@/hooks/Snackbar";
import { Container, Gap, Box, Row } from "@/ui/layouts";
import { SearchIcon, AddIcon } from "@/ui/icons";
import { Txt } from "@/ui/texts";
import { SearchedGroupList } from "./SearchedGroupList";
import { MyGroupList } from "./MyGroupList";
import { GroupTagCandidate } from "../../components/GroupTagCandidate";
import type { GroupT, GroupTagT } from "@/types";

export function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<GroupTagT|null>(null);
  const router = useRouter();

  function handleGroupClick(group: GroupT): void {
    // groupAct.set({ status: "loaded", data: { group } });
    router.push(`/g/${group.key}`);
  }

  return (
    <NavbarLayout
      navbar={<Navbar />}
      height={NAV_HEIGHT}
    >
      <Container rtlP>
        <Txt variant="h4">대시보드</Txt>

        <Gap y={2} />

        <Txt variant='h5'>내 그룹</Txt>

        <Gap y={2} />

        <MyGroupList
          onGroupClick={handleGroupClick}
        />


        {( searchQuery.length == 0 && selectedTag == null ) && (
          <Row justifyContent='center' pt={2}>
            <Link href="/g/create">
              <Button
                variant="contained"
                startIcon={<AddIcon/>}
              >
                그룹 만들기
              </Button>
            </Link>
          </Row>
        )}

        <Box pt={{ xs: 4, sm: 8, md: 12 }}/>

        <Txt variant='h5'>이런 그룹은 어때요?</Txt>

        <Gap y={2} />

        <GroupTagCandidate
          withAll
          selected={selectedTag}
          onSelect={(item) => setSelectedTag(item)}
        />

        <Gap y={2} />

        <TextField
          label="그룹 검색"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          type='search'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Gap y={2} />


        <SearchedGroupList
          query={searchQuery}
          tag={selectedTag}
          onGroupClick={handleGroupClick}
        />

        <Gap y={20}/>

      </Container>

    </NavbarLayout>
  );
}