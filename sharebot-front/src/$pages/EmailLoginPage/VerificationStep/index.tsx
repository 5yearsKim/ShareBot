import React, { ChangeEvent, useState, useEffect } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { Box, Col, Row, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { GroupLink } from "@/system/navigator";
// logic
import * as AuthApi from "@/apis/auth";
import { useAccountActions } from "@/stores/AccountStore";
import { useSnackbar } from "@/hooks/Snackbar";

type VerificationStepProps = {
  email: string;
  onVerified: () => void;
};

export function VerificationStep({
  email,
  onVerified,
}: VerificationStepProps): JSX.Element {

  const accountAct = useAccountActions();
  const { enqueueSnackbar } = useSnackbar();

  const [code, setCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(180);

  const submitDisable = code == "" || countdown <= 0;

  useEffect(() => {
    const countFnc = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearInterval(countFnc);
  }, [countdown]);

  function handleCodeChange(e: ChangeEvent<HTMLInputElement>): void {
    setCode(e.target.value);
  }

  async function handleSubmit(): Promise<void> {
    try {
      setIsSubmitting(true);
      const session = await AuthApi.emailLogin(email, code);
      accountAct.loadFromSession(session);
      enqueueSnackbar(`${email}로 로그인했어요 :)`, { variant: "success" });
      onVerified();
    } catch (e: any) {
      const errCode = e.response?.data?.code;
      let errMessage = e.response?.data?.message;
      if (errCode == "FORBIDDEN") {
        if (errMessage.startsWith("VERIFICATION_NOT_EXIST")) {
          errMessage = "이메일 인증 요청 정보가 존재하지 않아요.";
        } else if (errMessage.startsWith("TRIAL_OVER")) {
          errMessage = "시도 제한 한도를 초과했어요. 나중에 다시 시도해주세요.";
        } else if (errMessage.startsWith("INVALID_CODE")) {
          errMessage = "올바르지 않은 인증코드에요.";
        }
        enqueueSnackbar(errMessage, { variant: "error" });
      } else {
        console.warn(e);
        enqueueSnackbar("인증에 실패했어요.", { variant: "error" });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderTimer(): JSX.Element {
    const min = Math.floor(countdown / 60);
    let sec = `${countdown % 60}`;
    if (sec.length == 1) {
      sec = "0" + sec;
    }

    return (
      <Box mx={0.5}>
        <Txt
          color='#ff0000'
          variant='body2'
        >
          {min}:{sec}
        </Txt>
      </Box>
    );
  }

  return (
    <Col alignItems='center'>
      <Txt textAlign='center' variant='subtitle2'>
        {`인증코드가 ${email}로 전송되었어요.`}
      </Txt>

      <Gap y={2} />

      <Row alignItems='end'>
        <TextField
          label={"인증코드"}
          value={code}
          autoComplete='off'
          variant='standard'
          onChange={handleCodeChange}
          InputProps={{
            endAdornment: renderTimer(),
          }}
        />

        <Gap x={1}/>

        {isSubmitting ? (
          <CircularProgress size='1.5rem' />
        ) : (
          <Button
            onClick={handleSubmit}
            variant='contained'
            disabled={submitDisable}
          >
            {"인증"}
          </Button>
        )}
      </Row>

      <Gap y={2} />

      {countdown <= 0 && (
        <Col alignItems='center'>
          <Txt color='vague.main'>{"인증 가능 시간이 지났어요. 다시 시도해주세요."}</Txt>

          <Gap y={1} />

          <GroupLink href='/'>
            <Button variant='contained'>{"홈으로"}</Button>
          </GroupLink>
        </Col>
      )}
    </Col>
  );
}
