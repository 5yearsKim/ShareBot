"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Container, Box, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import * as GroupApi from "@/apis/groups";
import * as XGroupGroupTagApi from "@/apis/x_group_group_tag";
import { useSnackbar } from "@/hooks/Snackbar";
import { NavbarLayout } from "@/components/$layouts/NavbarLayout";
import { Navbar } from "@/components/Navbar";
import { NAV_HEIGHT } from "@/ui/global";
import { GroupForm } from "@/components/GroupForm";
import type { GroupFormT, GroupTagT } from "@/types";


export function CreateGroupPage() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  async function handleSubmit(form: GroupFormT, xData: {tags?: GroupTagT[]}): Promise<void> {
    const { tags } = xData;
    try {
      const created = await GroupApi.create(form);
      if (tags) {
        await Promise.all(tags.map((tag) => XGroupGroupTagApi.create({
          group_id: created.id,
          tag_id: tag.id,
        })));
      }
      enqueueSnackbar(`프로젝트 ${created.name}이/가 생성되었어요.`, { variant: "success" });
      setTimeout(() => {
        enqueueSnackbar("관리자페이지에서 프로젝트 비밀번호를 설정할 수 있어요.", { variant: "info" });
      }, 800);
      router.replace(`/g/${created.key}`);
    } catch (e: any) {
      const errCode = e.response?.data?.code;
      if (errCode === "ALREADY_EXIST") {
        enqueueSnackbar(`이미 존재하는 프로젝트 키(${form.key})에요. 다른 그룹 키를 설정해주세요.`, { variant: "info" });
      } else {
        console.warn(e);
        enqueueSnackbar("프로젝트 생성에 실패했어요.", { variant: "error" });
      }
    }
  }

  return (
    <NavbarLayout
      navbar={<Navbar />}
      height={NAV_HEIGHT}
    >
      <Container rtlP>
        <Txt variant="h4">프로젝트 만들기</Txt>

        <Gap y={2} />

        <Box
          margin='auto'
          maxWidth={400}
        >
          <GroupForm
            onSubmit={handleSubmit}
          />
        </Box>

      </Container>
    </NavbarLayout>
  );
}