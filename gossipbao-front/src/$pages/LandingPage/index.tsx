
import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { Container, Box, Gap, Col } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { NAV_HEIGHT } from "@/ui/global";
import { BOT_INFO } from "@/config";
import { Navbar } from "@/components/Navbar";
import { NavbarLayout } from "@/components/$layouts/NavbarLayout";
import { StartButton } from "./StartButton";
import { GroupStartButton } from "./GroupStartButton";

type LandingPageProps = {
  redirectGroupKey?: string
}

export function LandingPage({ redirectGroupKey }: LandingPageProps): JSX.Element {

  function renderCharacter(size: number) {
    return (
      <Col alignItems='center'>
        <Box
          width='auto'
          height='auto'
          borderRadius='50%'
          p='8px'
          boxShadow={1}
          bgcolor='paper.main'
        // sx={{
        //   transform: "scale(1.5)",
        // }}
        >
          <Box
            position='relative'
            overflow='clip'
            borderRadius='50%'
            sx={{
              overflow: "hidden"
            }}
          >
            <Image
              src={BOT_INFO.thumbnail}
              width={size}
              height={size}
              alt={BOT_INFO.name}
              style={{ objectFit: "fill" }}
            />
          </Box>
        </Box>
        <Gap y={2} />
        <Txt fontWeight={700}>@{BOT_INFO.id}</Txt>
        <Txt fontWeight={400} color='vague.main'>가십거리 좋아하는 편</Txt>
      </Col>
    );
  }

  return (
    <NavbarLayout
      navbar={<Navbar />}
      height={NAV_HEIGHT}
    >
      <Container>
        <Col alignItems='center'>

          <Gap y={10}/>

          <Txt
            variant='h2'
            textAlign='center'
            sx={{ wordBreak: "keep-all" }}
          >
            우리 조직 비밀 이야기, AI 챗봇이랑 나누고 싶다면?
          </Txt>

          <Gap y={4}/>

          {renderCharacter(160)}

          <Gap y={4}/>

          <StartButton/>
          {/* {redirectGroupKey ? (
            <GroupStartButton groupKey={redirectGroupKey}/>
          ) : (
            <StartButton/>
          )} */}

          <Gap y={12}/>

        </Col>
      </Container>
    </NavbarLayout>
  );
}
