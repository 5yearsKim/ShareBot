import React, { Fragment } from "react";
import { IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { CameraIcon, EditIcon, ImageOlIcon, AccountIcon } from "@/ui/icons";

import { useState, useRef, MouseEvent, ChangeEvent } from "react";


type ProfileEditButtonProps = {
  src?: string;
  size?: string;
  onSelect: (imgFile: File) => any;
  onRemove: () => any;
};

export function ProfileEditButton({
  src,
  size,
  onSelect,
  onRemove,
}: ProfileEditButtonProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);
  const isImgEmpty = src === undefined;
  const menuOpen = Boolean(menuEl);

  function handleButtonClick(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    e.stopPropagation();
    if (src) {
      setMenuEl(e.currentTarget);
    } else {
      handleFileUploadTrigger();
    }
  }

  function handleMenuClose(): void {
    setMenuEl(null);
  }

  function handleFileUploadTrigger(): void {
    if (!inputRef) {
      return;
    }
    if (menuEl) {
      setMenuEl(null);
    }
    inputRef.current!.click();
  }

  function handleImageRemove(): void {
    if (!src) {
      return;
    }
    onRemove();
    setMenuEl(null);
  }

  async function handleInputFileChange(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = e.target.files;
    if (!files || !files.length) {
      return;
    }
    const file = files[0];
    onSelect(file);
  }

  const bgSize = size ?? "33px";
  const iconSize = `calc(${bgSize} * 0.6)`;

  return (
    <Fragment>
      <input
        ref={inputRef}
        hidden
        accept='image/*'
        multiple={false}
        type='file'
        onChange={handleInputFileChange}
        onClick={(e: any): void => {
          e.target.value = null;
        }}
      />
      <IconButton
        onClick={handleButtonClick}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.7)",
          width: bgSize,
          height: bgSize,
          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.25)",
        }}
      >
        {isImgEmpty ? (
          <CameraIcon sx={{ width: iconSize, height: iconSize }} />
        ) : (
          <EditIcon sx={{ width: iconSize, height: iconSize }} />
        )}
      </IconButton>
      <Menu
        anchorEl={menuEl}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleFileUploadTrigger}>
          <ListItemIcon>
            <ImageOlIcon />
          </ListItemIcon>
          이미지 변경
        </MenuItem>
        <MenuItem onClick={handleImageRemove}>
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          기본 이미지
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
