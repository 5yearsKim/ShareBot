"use client";
import React, { ChangeEvent, useCallback, useRef } from "react";
import { Container } from "@/ui/layouts";
import { useSnackbar } from "@/hooks/Snackbar";
import * as GroupApi from "@/apis/groups";
import { GroupFileList } from "./GroupFileList";

import { useDropzone } from "react-dropzone";

import type { GroupFileT } from "@/types";


export function GroupFileMainPage(): JSX.Element {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(file, binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);


  const { getRootProps, getInputProps } = useDropzone({ onDrop });



  return (
    <Container rtlP>
      GroupFileMain Page
      <div
        style={{
          backgroundColor: "green"
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>

      <GroupFileList/>


    </Container>
  );
}