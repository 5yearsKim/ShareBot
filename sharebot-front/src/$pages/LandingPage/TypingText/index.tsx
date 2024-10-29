"use client";
import { TypeAnimation } from "react-type-animation";


export function TypingText() {
  return (
    <TypeAnimation
      sequence={[
        "복잡한 pdf 문서를 그저 업로드 하는 것으로 충분해요. \n AI가 모두 이해해서 처리해줄거에요.",
        1000,
        "",
        // "복잡한 pdf 문서를 그저 업로드 하는 것으로 충분해요. AI가 모두 이해해서 처리해줄거에요.",
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: "2em", display: "block", whiteSpace: "pre-line", textAlign: "center" }}
      repeat={Infinity}
    />
  );
}