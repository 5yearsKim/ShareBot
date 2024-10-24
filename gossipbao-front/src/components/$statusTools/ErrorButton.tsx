import React from "react";
import { Button } from "@mui/material";
import { ErrorIcon } from "@/ui/icons";

type ErrorButtonProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorButton({
  message,
  onRetry,
}: ErrorButtonProps): JSX.Element {

  return (
    <Button
      onClick={onRetry}
      startIcon={<ErrorIcon />}
    >
      {message ?? "다시 시도"}
    </Button>
  );
}
