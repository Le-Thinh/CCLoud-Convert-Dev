import React, { useState } from "react";
import { fmtSize, triggerDownload } from "../../utils";
import FormatSelect from "../FormatSelect";
import { StatusBadge } from "../../assets/statusFile";
import TransformOptionsModal from "../modal/TransformOptionsModal";

const FileRow = ({
  file,
  targetMime,
  status,
  allowedMimes,
  opts,
  result,
  error,
  onRemove,
  onFormatChange,
  onOptsChange,
  onOptsChangeAll,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const ext = file.name.split(".").pop().toUpperCase();
  const isDone = status === "done";
  const isActive = status === "converting";
  const id = `${file.name}-${file.size}`;

  const meta = result?.metadata;
  const convertedExt =
    meta?.converted?.format?.toUpperCase() ??
    targetMime?.split("/").pop().toUpperCase();
  const downloadName = meta?.filenameDownload;
  const urlPreview = meta?.convertedUrlPreview;
  const urlDownload = meta?.convertedUrlDownload;

  return (
    <div
      className={`border rounded-xl bg-white w-full transition-all ${
        isDone
          ? "border-green-200 bg-green-50/30"
          : isActive
            ? "border-blue-200 bg-blue-50/20"
            : status === "error"
              ? "border-red-200"
              : "border-zinc-200"
      }`}
    >
      {/* Main row */}
      <div className="flex items-center gap-4 px-5 py-4">
        {/* File info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[11px] font-mono font-semibold text-blue-600 shrink-0 tracking-wide">
            {ext}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-900 truncate leading-snug">
              {file.name}
            </p>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              {fmtSize(file.size)}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <StatusBadge status={status} />

        {/* Convert to — hide when converting/done */}
        {status !== "converting" && status !== "done" && (
          <div className="flex items-center gap-2.5 shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              className="text-zinc-300"
            >
              <path
                d="M2.5 7A4.5 4.5 0 0 1 11 4.5M11 4.5V2m0 2.5H8.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.5 7A4.5 4.5 0 0 1 3 9.5M3 9.5V12m0-2.5h2.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm text-zinc-400">Convert to</span>

            <FormatSelect
              allowedMimes={allowedMimes}
              value={targetMime}
              onChange={(mime) => onFormatChange(mime, id)}
            />

            {targetMime && (
              <button
                onClick={() => setModalOpen(true)}
                className="group border border-zinc-200 rounded-md p-2 cursor-pointer hover:bg-[#202020] transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-zinc-700 group-hover:text-white transition-colors"
                >
                  <path
                    d="M8.5 2a3 3 0 0 0-2.83 4L2 9.5 2.5 11.5l1.5.5L7.92 8.33A3 3 0 1 0 8.5 2z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="8.5" cy="5" r="1" fill="currentColor" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Remove — hide khi converting */}
        {status !== "converting" && (
          <button
            onClick={onRemove}
            className="w-8 h-8 shrink-0 rounded-lg border border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 3l8 8M11 3l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Result row — khi done */}
      {isDone && result && (
        <div className="flex items-center justify-between px-5 pb-4 pt-0 gap-4">
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="bg-zinc-100 border border-zinc-200 rounded px-1.5 py-0.5 text-[11px] font-mono text-zinc-600">
                {ext}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-zinc-400"
              >
                <path
                  d="M2 6h8M7 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="bg-zinc-100 border border-zinc-200 rounded px-1.5 py-0.5 text-[11px] font-mono text-zinc-600">
                {convertedExt}
              </span>
            </div>

            <span>{result.metadata?.source?.sizeFormatted}</span>
            <span className="text-zinc-300">→</span>
            <span>{result.metadata?.converted?.sizeFormatted}</span>
            {result.metadata?.stats?.changePercent && (
              <span className="text-green-600 font-semibold">
                {result.metadata?.stats.changePercent}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerDownload(urlDownload, downloadName)}
              disabled={!urlDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-md hover:bg-zinc-700 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1v7M3 5l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 9v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              Download
            </button>

            <button
              onClick={() => urlPreview && window.open(urlPreview, "_blank")}
              className="px-3 py-1.5 border border-zinc-200 text-zinc-500 text-xs rounded-md hover:bg-zinc-50 hover:text-zinc-800 transition-colors"
            >
              Preview
            </button>
          </div>
        </div>
      )}

      {/* Error row */}
      {status === "error" && error && (
        <div className="px-5 pb-4 pt-0">
          <p className="text-xs text-red-500 font-mono">{error}</p>
        </div>
      )}

      <TransformOptionsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        filename={file.name}
        targetMime={targetMime}
        initialOpts={opts}
        onApply={(newOpts) => {
          onOptsChange?.(newOpts);
          setModalOpen(false);
        }}
        onApplyAll={(newOpts) => {
          onOptsChangeAll?.(newOpts);
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default FileRow;
