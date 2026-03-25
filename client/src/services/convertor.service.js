"use strict";

import { detectFile } from "../api/convert";

export const detectFiles = async (files) => {
  const fd = new FormData();
  for (const file of files) {
    fd.append("files", file);
  }
  const { data } = await detectFile(fd);
  if (!data) throw new Error("Something wrong when get file from client");

  return data.metadata.files;
};
