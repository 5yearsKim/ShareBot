
import React from "react";
import Image from "next/image";
import { Container, Box, Gap, Col } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { NAV_HEIGHT } from "@/ui/global";
import { Navbar } from "@/components/Navbar";
import { NavbarLayout } from "@/components/$layouts/NavbarLayout";
import { StartButton } from "./StartButton";

type LandingPageProps = {
  redirectGroupKey?: string
}

export function LandingPage({ redirectGroupKey }: LandingPageProps): JSX.Element {

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
            Sample Text
          </Txt>

          <Gap y={4}/>


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
