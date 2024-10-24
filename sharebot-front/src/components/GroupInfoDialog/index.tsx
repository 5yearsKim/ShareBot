"use client";

import React, { Fragment } from "react";
import { Dialog, Button, IconButton } from "@mui/material";
import QRCode from "react-qr-code";
import { Col, Row, Gap, Expand } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { CopyIcon } from "@/ui/icons";
import { FRONT_URL } from "@/config";
import { useSnackbar } from "@/hooks/Snackbar";
import { GroupTagItem } from "@/components/GroupTagItem";
import type { GroupT } from "@/types";

type GroupInfoDialogProps = {
  group: GroupT
  open: boolean;
  onClose: () => void;
}


export function GroupInfoDialog({
  group,
  open,
  onClose,
}: GroupInfoDialogProps): JSX.Element {

  const { enqueueSnackbar } = useSnackbar();
  const groupUrl = `${FRONT_URL}/g/${group.key}`;

  function handleCopyClick(): void {
    navigator.clipboard.writeText(groupUrl);
    enqueueSnackbar("클립보드에 복사되었어요.", { variant: "success" });
  }

  function handleCloseClick(): void {
    onClose();
  }


  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <Col
        px={2}
        py={2}
        maxWidth={300}
        minWidth={250}
      >
        <Row>
          <Txt variant='h6'>{group.name}</Txt>
        </Row>


        <Gap y={1}/>

        <Txt variant='body2' color='vague.main'>{group.description ? group.description : "(설명 없음)"}</Txt>

        <Gap y={1}/>

        <Row justifyContent='flex-end'>
          {(group.tags ?? []).map((tag) => (
            <Fragment key={tag.id}>
              <GroupTagItem item={tag} size='small' />
            </Fragment>
          ))
          }
        </Row>


        <Gap y={4}/>


        <Row>
          <Txt variant="body1" fontWeight={700}>{"접속 정보"}</Txt>
          <Expand/>
          <Txt variant='body3' color='vague.main'>@{group.key}</Txt>
        </Row>

        <Gap y={1}/>

        <Row>
          <Txt variant="body3">{groupUrl}</Txt>
          <Gap y={1}/>
          <IconButton size='small' onClick={handleCopyClick}>
            <CopyIcon fontSize='small'/>
          </IconButton>
        </Row>

        <Gap y={1}/>

        <Row justifyContent='center'>
          <QRCode value={groupUrl} size={90}/>
        </Row>

        <Gap y={3}/>

        {/* <GroupAvatar group={group} size={40} /> */}
        <Row width='100%' justifyContent='center'>
          <Button variant='contained' onClick={handleCloseClick}>
            {"닫기"}
          </Button>
        </Row>
      </Col>
    </Dialog>
  );
}