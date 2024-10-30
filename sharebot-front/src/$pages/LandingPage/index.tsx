
import React from "react";
import Image from "next/image";
import { Container, Box, Gap, Col } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { NAV_HEIGHT } from "@/ui/global";
import { Navbar } from "@/components/Navbar";
import { NavbarLayout } from "@/components/$layouts/NavbarLayout";
import { aggro } from "@/ui/systems/fonts";
import { StartButton } from "./StartButton";
import { TypingText } from "./TypingText";

type LandingPageProps = {
  redirectGroupKey?: string
}

export function LandingPage({ redirectGroupKey }: LandingPageProps): JSX.Element {

  return (
    <NavbarLayout
      navbar={<Navbar />}
      height={NAV_HEIGHT}
    >
      <Box sx={{
        minHeight: "100vh",
        background: "linear-gradient(30deg, #ddddff, #ffffff, #ffffff, #ffffff, #ffdddd)"
      }}>
        <Container>
          <Col alignItems='center'>

            <Gap y={10}/>

            <Txt
              variant='h2'
              textAlign='center'
              fontFamily={aggro.style.fontFamily}
              sx={{
                wordBreak: "keep-all",
                background: "linear-gradient(180deg, #FF7E5F, #FEB47B, #86A8E7)",
                WebkitBackgroundClip: "text",
                color: "transparent",

              }}
            >
              <div color="primary.main">셰어봇,</div> 문서 공유형 챗봇
            </Txt>


            <Gap y={4}/>

            <Box minHeight={140}>
              <TypingText/>
            </Box>


            <Gap y={4}/>

            <Box
              width='100%'
              height='100%'
              position='relative'
              overflow='hidden'
              borderRadius={8}
              boxShadow='0px 4px 10px rgba(0, 0, 0, 0.3)'

            >
              <img
                src='./images/sample_chat.png'
                alt='sample chat'
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}

              />
            </Box>

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
      </Box>
    </NavbarLayout>
  );
}
