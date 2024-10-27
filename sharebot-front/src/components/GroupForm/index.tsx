"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  FormControl, FormLabel, RadioGroup, Radio, FormControlLabel,
  Collapse,
} from "@mui/material";
import { Col, Row, Gap } from "@/ui/layouts";
import { Txt } from "@/ui/texts";
import { useTextForm } from "@/hooks/TextForm";
import { useSnackbar } from "@/hooks/Snackbar";
import { useAlertDialog } from "@/hooks/dialogs/ConfirmDialog";
import { LoadingIndicator } from "@/components/$statusTools";
import { TextField, Button } from "@mui/material";
import { HelperTooltip } from "@/ui/tools/HelperTooltip";
import { EditableAvatar } from "@/ui/tools/EditableAvatar";
import { GroupAvatar } from "@/ui/tools/Avatar";
import { GroupTagCandidate } from "@/components/GroupTagCandidate";
import * as GroupApi from "@/apis/groups";
import { noEmptyValidator, maxLenValidator } from "@/utils/validator";
import { buildImgUrl } from "@/utils/media";
import { GroupT, GroupFormT, GroupTagT } from "@/types";


type GroupFormProps = {
  group?: GroupT
  isSubmitting?: boolean;
  onCancel?: () => void
  onSubmit: (form: GroupFormT, xData: {tags?: GroupTagT[]}) => void;
}

export function GroupForm({
  group,
  isSubmitting,
  onCancel,
  onSubmit,
}: GroupFormProps): JSX.Element {

  const {
    val: name,
    isValid: isNameValid,
    errText: nameErrText,
    helpText: nameHelpText,
    setVal: setName,
  } = useTextForm("", {
    validators: [noEmptyValidator(), maxLenValidator(16)]
  });

  const {
    val: groupKey,
    isValid: isGroupKeyValid,
    errText: groupKeyErrText,
    helpText: groupKeyHelpText,
    setVal: setGroupKey,
  } = useTextForm("", {
    validators: [noEmptyValidator(), maxLenValidator(12)]
  });


  const {
    val: description,
    isValid: isDescriptionValid,
    errText: errDescriptionText,
    helpText: descriptionHelpText,
    setVal: setDescription,
  } = useTextForm("", {
    validators: [noEmptyValidator(), maxLenValidator(120)]
  });

  const [thumbPath, setThumbPath] = useState<string|null>(null);
  const [selectedTag, setSelectedTag] = useState<GroupTagT|null>(null);
  const [protection, setProtection] = useState<GroupT["protection"]>("public");
  const { enqueueSnackbar } = useSnackbar();
  const { showAlertDialog } = useAlertDialog();

  const submitDisabled = !isNameValid || !isDescriptionValid || !isGroupKeyValid || isSubmitting;

  useEffect(() => {
    if (group) {
      setName(group.name);
      setGroupKey(group.key);
      setDescription(group.description ?? "");
      setThumbPath(group.avatar_path ?? "");
      setSelectedTag(Boolean(group.tags?.length) ? group.tags![0] : null);
    }
  }, []);

  function handleSubmitClick(): void {
    onSubmit({
      name,
      key: groupKey,
      description,
      protection: "private",
      avatar_path: thumbPath,
    }, {
      tags: selectedTag ? [selectedTag] : undefined,
    });
  };

  function handleGroupKeyChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    if (value.match(/[^a-zA-Z0-9-]/)) {
      return;
    }
    setGroupKey(value);
  }

  async function handleThumbnailSelect(file: File): Promise<void> {
    try {
      const { key } = await GroupApi.uploadThumbnail(file);
      setThumbPath(key);
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("이미지를 업로드 할 수 없어요.", { variant: "error" });
    }
  }


  async function handleRemoveThumbnailClick(): Promise<void> {
    if (!thumbPath) {
      return;
    }
    try {
      const isOk = await showAlertDialog({
        title: "썸네일 삭제",
        body: "썸네일을 삭제하시겠어요?",
        useCancel: true,
        useOk: true,
      });
      if (!isOk) {
        return;
      }
      await GroupApi.deleteThumbnail(thumbPath);
      setThumbPath(null);
    } catch (e) {
      console.warn(e);
      enqueueSnackbar("이미지를 삭제할 수 없어요.", { variant: "error" });
    }
  }

  function handleGroupTagSelect(tag: GroupTagT|null): void {
    if (tag === null) {
      return;
    }
    if (tag.id === selectedTag?.id) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  }

  function handleProtectionChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value;
    setProtection(val as GroupT["protection"]);
  }


  return (
    <Col>
      <TextField
        label='프로젝트 이름'
        variant='standard'
        value={name}
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
        error={Boolean(nameErrText)}
        helperText={nameErrText || nameHelpText}
      />
      <TextField
        label='프로젝트 키'
        variant='standard'
        value={groupKey}
        autoComplete="off"
        placeholder={"영문, 숫자, - 만 가능해요"}
        InputProps={{
          endAdornment: <HelperTooltip tip="프로젝트 키는 URL에 활용되는 고유값이에요."></HelperTooltip>
        }}
        onChange={handleGroupKeyChange}
        error={Boolean(groupKeyErrText)}
        helperText={groupKeyErrText || groupKeyHelpText}
      />

      <Gap y={4} />


      <TextField
        label='프로젝트 설명'
        variant='standard'
        multiline
        minRows={3}
        maxRows={6}
        value={description}
        autoComplete="off"
        onChange={(e) => setDescription(e.target.value)}
        error={Boolean(errDescriptionText)}
        helperText={errDescriptionText || descriptionHelpText}
      />

      <Gap y={2} />

      <Col alignItems='center'>
        <Txt variant="subtitle1" fontWeight={700}>프로젝트 썸네일</Txt>
        <Gap y={2}/>
        <EditableAvatar
          src={thumbPath ? buildImgUrl(null, thumbPath) : undefined}
          onImageSelect={handleThumbnailSelect}
          onImageRemove={handleRemoveThumbnailClick}
          renderAvatar={(src) => {
            return (
              <GroupAvatar
                group={{
                  avatar_path: thumbPath,
                  name: name,
                } as GroupT}
                size={100}
              />
            );
          }}
        />

        <Gap y={4}/>

        <Txt variant="subtitle1" fontWeight={700}>프로젝트 카테고리</Txt>
        <Gap y={2}/>
        <GroupTagCandidate
          selected={selectedTag}
          onSelect={handleGroupTagSelect}
        />

        {/* <Gap y={4}/>
        <Txt variant="subtitle1" fontWeight={700}>그룹 공개 범위</Txt>
        <Gap y={2}/>
        <FormControl>
          <FormLabel>공개 범위</FormLabel>
          <RadioGroup
            defaultValue="public"
            row
            value={protection}
            onChange={handleProtectionChange}
          >
            <FormControlLabel value="public" control={<Radio />} label="공개" />
            <FormControlLabel value="private" control={<Radio />} label="비공개" />
          </RadioGroup>
        </FormControl> */}
      </Col>


      <Gap y={4} />

      <Row justifyContent='center' width='100%'>
        {onCancel && (
          <Button
            onClick={onCancel}
          >
            취소
          </Button>

        )}

        {isSubmitting ? (
          <LoadingIndicator size='1.5rem'/>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmitClick}
            disabled={submitDisabled}
          >
            {group ? "수정" : "생성"}
          </Button>
        )}
      </Row>

    </Col>
  );
}