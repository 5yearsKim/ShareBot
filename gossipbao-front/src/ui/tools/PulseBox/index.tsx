import React from "react";
import { keyframes, Box, BoxProps } from "@mui/material";


export interface PulseBoxProps extends BoxProps {
  duration?: string;
  animation?: string
  minScale?: number
  maxScale?: number
}


export function PulseBox({
  duration = "1s",
  animation = "ease",
  minScale = 0.99,
  maxScale = 1,
  ...boxProps
}: PulseBoxProps): JSX.Element {


  const spin = keyframes`
0% {
  transform: scale(${minScale});
}

70% {
  transform: scale(${maxScale});
}

100% {
  transform: scale(${minScale});
}

`;
  return (
    <Box
      {...boxProps}
      sx={{
        ...boxProps.sx,
        animation: `${spin} ${duration} infinite ${animation}`,
      }}
    />
  );
}
