"use client";


import React, { useState } from "react";
import Image from "next/image";
import {
  Button, TextField,
  Checkbox, FormGroup, FormControlLabel,
} from "@mui/material";
import { Container, Box, Col, Row, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { LockIcon } from "@/ui/icons";
import { useGroup } from "@/stores/GroupStore";
import { useUserActions } from "@/stores/UserStore";
import { useSnackbar } from "@/hooks/Snackbar";
import { useGroupRouter } from "@/system/navigator";
import { BOT_INFO } from "@/config";

import * as UserApi from "@/apis/users";


export function GroupJoinPage(): JSX.Element {
  const group = useGroup();
  const userAct = useUserActions();
  const groupRouter = useGroupRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [password, setPassword] = useState<string>("");

  async function handleGoBackClick(): Promise<void> {
    groupRouter.replaceRaw("/");
  }

  async function handleJoinClick(): Promise<void> {
    try {
      await UserApi.requestJoin(group.id, password);
      await userAct.access(group.id);
      enqueueSnackbar("그룹에 성공적으로 가입했어요.", { variant: "success" });
      groupRouter.replace("/");
    } catch (e: any) {
      const code = e.response.data.code;
      if (code === "FORBIDDEN") {
        enqueueSnackbar("비밀번호가 틀렸어요.", { variant: "error" });
        return;
      } else {
        console.warn(e);
        enqueueSnackbar("그룹 가입에 실패했어요.", { variant: "error" });
      }
    }
  }


  return (
    <Container rtlP>
      <Col alignItems='center' maxWidth={450} m='auto'>

        <Txt variant='h6'>그룹 {group.name} 에 가입하고 가십바오와 대화할까요?</Txt>

        <Gap y={2}/>

        <Box
          position='relative'
          width={100}
          height={100}
          borderRadius={"50%"}
          overflow={"hidden"}
        >
          <Image
            src={BOT_INFO.thumbnail}
            alt={BOT_INFO.name}
            fill
          />
        </Box>

        <Gap y={2}/>

        <Col>
          <ul>
            <li>가십바오와 나눈 대화는 가십바오 학습에 활용될 수 있어요.</li>
            <li>{`내가 추가한 정보는 나만 확인할 수 있지만 가십바오를 통해 \"${group.name}\" 구성원들에게 전달될 수 있어요.`}</li>
          </ul>
        </Col>

        <Gap y={2}/>


        <Gap y={2}/>

        {group.secret ? (
          <Col justifyContent='center'>

            <Row>
              <LockIcon/>
              <Gap x={1}/>
              <Txt variant="h6">비밀 그룹</Txt>
            </Row>

            <Gap y={1}/>

            <Txt> <b>힌트:</b> {group.secret.hint}</Txt>

            <Gap y={1}/>

            <TextField
              label='비밀번호'
              // variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // type='password'
            />

            <Gap y={3}/>

            <Row>
              <Button
                onClick={handleGoBackClick}
              >
                대시보드 돌아가기
              </Button>

              <Button
                variant='contained'
                onClick={handleJoinClick}
              >
                비밀번호 입력
              </Button>
            </Row>
          </Col>
        ) : (
          <Row>
            <Button
              onClick={handleGoBackClick}
            >
              대시보드
            </Button>

            <Button
              variant='contained'
              onClick={handleJoinClick}
            >
              동의하고 시작하기
            </Button>
          </Row>
        )}


      </Col>
    </Container>
  );
}