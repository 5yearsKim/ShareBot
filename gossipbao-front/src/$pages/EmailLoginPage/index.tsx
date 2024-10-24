"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { NavbarLayout } from "@/components/$layouts/NavbarLayout";
import { NAV_HEIGHT } from "@/ui/global";
import { Box, Button } from "@mui/material";
import { Center, Col, Gap, Container } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { EmailRequestStep } from "./EmailRequestStep";
import { VerificationStep } from "./VerificationStep";
import { useState } from "react";
import { useGroupRouter } from "@/system/navigator";
import { useMe } from "@/stores/UserStore";

export function EmailLoginPage(): JSX.Element {
  const me = useMe();
  const [step, setStep] = useState<number>(1); // 1 for init, 2 for verifying
  const [email, setEmail] = useState<string>("");
  const groupRouter = useGroupRouter();

  function handleEmailRequested(email: string): void {
    setEmail(email);
    setStep(2);
  }

  function handleVerified(): void {
    groupRouter.replace("/");
  }

  if (me) {
    return (
      <Center width='100%'>
        <Col alignItems='center'>
          <Gap y={4} />
          <Txt variant='h6'>로그인</Txt>

          <Gap y={2} />

          <Link href='/'>
            <Button variant='contained'>홈으로</Button>
          </Link>
        </Col>
      </Center>
    );
  }

  return (
    <NavbarLayout
      navbar={<Navbar />}
      height={NAV_HEIGHT}
    >
      <Container rtlP>
        <Box
          pt={4}
          maxWidth='400px'
          margin='auto'
        // bgcolor={'green'}
        >
          {step == 1 && (
            <EmailRequestStep
              onRequested={handleEmailRequested}
            />
          )}
          {step == 2 && (
            <VerificationStep
              email={email}
              onVerified={handleVerified}
            />
          )}
        </Box>
      </Container>
    </NavbarLayout>
  );
}
