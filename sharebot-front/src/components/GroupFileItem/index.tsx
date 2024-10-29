import React, { useState } from "react";

import { Box, Gap, Col, Expand, Row } from "@/ui/layouts";
import { EllipsisTxt } from "@/ui/texts";
import { MoreIcon, DeleteOlIcon, UnfoldIcon } from "@/ui/icons";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import type { GroupFileT } from "@/types";

type GroupFileItemProps = {
  groupFile: GroupFileT
  onClick?: () => any
  onDeleteClick?: () => any
  onTextViewClick?: () => any
}

export function GroupFileItem(props: GroupFileItemProps): JSX.Element {
  const {
    groupFile,
    onClick,
    onDeleteClick,
    onTextViewClick,
  } = props;

  const [menuEl, setMenuEl] = useState<HTMLElement|null>(null);

  function handleMoreClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    e.stopPropagation();
    setMenuEl(e.currentTarget);
  }

  function handleMoreClose(e: React.MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    setMenuEl(null);
  }

  function handleDeleteClick(e: React.MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    setMenuEl(null);
    if (onDeleteClick) {
      onDeleteClick();
    }
  }

  function handleTextViewClick(e: React.MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    setMenuEl(null);
    if (onTextViewClick) {
      onTextViewClick();
    }
  }

  return (
    <Box
      bgcolor='paper.main'
      borderRadius={2}
      boxShadow={2}
      py={1}
      px={2}
      onClick={onClick}
      sx={{
        cursor: "pointer"
      }}
    >
      <Col
        justifyContent='center'
        alignItems='center'
      >
        <img
          src='/images/pdf_image.png'
          alt='preview_file'
          width={80}
          height={80}
        />
        <Gap y={1}/>
        <Row width='100%'>
          <EllipsisTxt maxLines={1}>
            {groupFile.name}
          </EllipsisTxt>
          <Expand/>
          <IconButton
            onClick={handleMoreClick}
          >
            <MoreIcon/>
          </IconButton>
        </Row>
      </Col>
      <Menu
        anchorEl={menuEl}
        open={Boolean(menuEl)}
        onClose={handleMoreClose}
      >
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteOlIcon/>
          </ListItemIcon>
          <ListItemText>
            삭제
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleTextViewClick}>
          <ListItemIcon>
            <UnfoldIcon/>
          </ListItemIcon>
          <ListItemText>
            텍스트 보기
          </ListItemText>
        </MenuItem>
      </Menu>

    </Box>
  );
}