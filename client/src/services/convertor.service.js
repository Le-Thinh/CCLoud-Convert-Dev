"use strict";

import { convert, detectFile } from "../api/convert";

export const detectFiles = async (files) => {
  const results = await Promise.allSettled(
    files.map(async (file) => {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await detectFile(fd);

      return { filename: file.name, success: true, ...data.metadata };
    }),
  );

  return results.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : { filename: files[i].name, success: false, error: r.reason?.message },
  );
};

export const convertMain = async (entries) => {
  const results = await Promise.allSettled(
    entries.map(async (entry) => {
      const { file, targetMime, opts = {} } = entry;

      const fd = new FormData();
      fd.append("file", file);
      fd.append("targetMime", targetMime);

      // opts nếu có — ví dụ quality, margin, resize
      if (Object.keys(opts).length > 0) {
        fd.append("opts", JSON.stringify(opts));
        console.log(opts);
      }

      const { data } = await convert(fd);
      return { filename: file.name, success: true, ...data.metadata };
    }),
  );

  return results.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : {
          filename: entries[i].file.name,
          success: false,
          error: r.reason?.message ?? "Conversion failed",
        },
  );
};
