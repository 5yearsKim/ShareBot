import React, { ReactNode, useState } from "react";
import { Dialog, Button } from "@mui/material";
import { Box, Col, Row, Gap } from "@/ui/layouts";
import { ChatModelSelector } from "@/$pages/GroupSettingPage/ChatModelSelector";


type ModelSelectorWrapperProps = {
  children: ReactNode
}

export function ModelSelectorWrapper({
  children
}: ModelSelectorWrapperProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClose(): void {
    setIsOpen(false);
  }
  function handleOpen(): void {
    setIsOpen(true);
  }

  function handleApply(): void {
    handleClose();
    window.location.reload();
  }

  return (
    <>
      <Box onClick={handleOpen}>
        {children}
      </Box>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <Col px={2} py={2}>
          <ChatModelSelector />

          <Gap y={2} />
          <Row justifyContent='center'>
            <Button
              variant="contained"
              onClick={handleApply}
            >
              확인
            </Button>
          </Row>
        </Col>
      </Dialog>
    </>
  );
}