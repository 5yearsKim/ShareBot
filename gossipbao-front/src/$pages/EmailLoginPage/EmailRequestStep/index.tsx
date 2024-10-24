"use client";
import React, { useState, ChangeEvent } from "react";
import { useLocale } from "@/system/navigator";
import { TextField, InputAdornment, Button } from "@mui/material";
import { Col, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { EmailIcon } from "@/ui/icons";
import { BOT_INFO } from "@/config";
import { LoadingIndicator } from "@/components/$statusTools";

// logic
import { useTextForm } from "@/hooks/TextForm";
import { useSnackbar } from "@/hooks/Snackbar";
import { emailValidator } from "@/utils/validator";
import * as EmailVerificationApi from "@/apis/email_verifications";


type EmailRequestStepProps = {
  onRequested: (email: string) => void;
};

export function EmailRequestStep({
  onRequested,
}: EmailRequestStepProps): JSX.Element {
  const locale = "ko";

  const {
    val: email,
    setVal: setEmail,
    isValid: isEmailValid,
    errText: emailErrText,
  } = useTextForm("", {
    validators: [emailValidator()],
  });
  const submitDisable = !isEmailValid;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  async function handleRequestClick(): Promise<void> {
    try {
      setIsSubmitting(true);
      await EmailVerificationApi.request(email, { serviceName: BOT_INFO.name, locale } );
      onRequested(email);
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("인증 요청에 실패했어요.", { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Col alignItems='center'>
      <Txt variant='h6'>{"이메일을 입력해주세요."}</Txt>

      <Gap y={1} />

      <Txt color='vague.main'>{"패스워드는 필요없어요 :)"}</Txt>

      <Gap y={2} />

      <TextField
        value={email}
        onChange={handleEmailChange}
        fullWidth
        autoComplete='off'
        error={Boolean(emailErrText)}
        helperText={emailErrText}
        type='email'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />

      <Gap y={2} />
      {isSubmitting ? (
        <LoadingIndicator size='1.5rem' />
      ) : (
        <Button
          disabled={submitDisable}
          variant='contained'
          onClick={handleRequestClick}
        >
          {"메일 인증하기"}
        </Button>
      )}
    </Col>
  );
}
