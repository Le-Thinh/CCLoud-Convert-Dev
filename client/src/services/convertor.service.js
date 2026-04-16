"use strict";

import { convert, detectFile, getJobStatus } from "../api/convert";

const POLL_INTERVAL = 2000; // 2 giây
const POLL_TIMEOUT = 120000; // 2 phút

const pollUntilComplete = (jobId, onComplete) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const poll = async () => {
      if (Date.now() - startTime > POLL_TIMEOUT) {
        reject(new Error("Polling timed out"));
      }
      try {
        const { data } = await getJobStatus(jobId);

        const { state, result, error } = data.metadata;
        if (state === "completed") return resolve(result);
        if (state === "failed") return reject(new Error(error ?? "Job failed"));

        setTimeout(poll, POLL_INTERVAL);
      } catch (error) {
        reject(error);
      }
    };
    poll();
  });
};

export const detectFiles = async (files, onFileComplete) => {
  const results = await Promise.allSettled(
    files.map(async (file) => {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await detectFile(fd);

      const result = { filename: file.name, success: true, ...data.metadata };

      const id = `${file.name}-${file.size}`;
      onFileComplete(id, result);
      return result;
    }),
  );

  return results.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : { filename: files[i].name, success: false, error: r.reason?.message },
  );
};

export const convertMain = async (entries, onFileComplete) => {
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
      const { jobId } = data.metadata;

      const result = pollUntilComplete(jobId);
      const finalResult = {
        filename: file.name,
        success: true,
        ...result.metadata,
      };

      onFileComplete(entry.id, finalResult);
      return finalResult;
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
