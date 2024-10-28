import React, { useState } from "react";

import { Box, Gap, Col, Row } from "@/ui/layouts";
import { Clickable } from "@/ui/tools/Clickable";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MoreIcon, DeleteOlIcon } from "@/ui/icons";

import type { GroupFileT } from "@/types";

type GroupFileItemProps = {
  groupFile: GroupFileT
  onClick?: () => any
  onDeleteClick?: () => any
}

export function GroupFileItem(props: GroupFileItemProps): JSX.Element {
  const {
    groupFile,
    onClick,
    onDeleteClick,
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

  return (
    <Box
      bgcolor='paper.main'
      borderRadius={2}
      boxShadow={2}
      py={2}
      px={1}
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
        <Row>
          {groupFile.name}
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
      </Menu>

    </Box>
  );
}