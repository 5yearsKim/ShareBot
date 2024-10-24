import React, { useMemo, ChangeEvent } from "react";
import {
  FormControl, FormLabel, FormControlLabel,
  RadioGroup, Radio,
} from "@mui/material";
import { Col, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";


export function ChatModelSelector() {

  const initGeneratorType = useMemo(() => {
    const type = localStorage.getItem("generatorType");
    return type || "claude";
  }, []);

  function handleModelTypeChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    localStorage.setItem("generatorType", value);
  }

  return (
    <FormControl>
      <FormLabel>생성 모델 타입</FormLabel>
      <Gap y={1}/>
      <RadioGroup
        defaultValue={initGeneratorType}
        onChange={handleModelTypeChange}
      >
        <FormControlLabel value="openai" control={<Radio />}
          label={
            <SelectLabel company="OpenAI" model="ChatGPT" description="다정하고 친근한 동네친구처럼 말해줘요." />
          }
        />
        <FormControlLabel value="claude" control={<Radio />}
          label={
            <SelectLabel company="Anthropic" model="Claude3" description="짓굳고 장난기 많은 개구쟁이처럼 말해줘요." />

          }
        />
        <FormControlLabel value="gemini" control={<Radio />}
          label={
            <SelectLabel company="Google" model="Gemini" description="친절하고 배려 깊은 선생님처럼 말해줘요." />
          } />
      </RadioGroup>
    </FormControl>
  );
}


function SelectLabel({
  company, model, description
}: {
  company: string, model: string, description: string,
 }): JSX.Element {
  return (
    <Col p={0.5}>
      <Txt><b>{model}</b>({company})</Txt>
      <Txt variant="caption">{description}</Txt>
    </Col>
  );
}
