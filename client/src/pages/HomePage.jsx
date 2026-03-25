import React, { useRef, useState } from "react";
import Input from "../components/form/input/InputField";
import { useNavigate } from "react-router-dom";
import FileRow from "../components/ui/FileRow";
import { FEATURES } from "../assets/features";
import { convertToPdf } from "../api/convert";
import { detectFiles } from "../services/convertor.service";
import { flattenSuggest } from "../utils";
import { toast } from "react-toastify";

const createEntry = (file) => ({
  id: `${file.name}-${file.size}`,
  file,
  sourceMime: null,
  allowedMimes: [],
  targetMime: "",
  status: "idle",
  result: null,
  error: null,
});

const HomePage = () => {
  const convertOne = async (entry) => {
    const { file, targetMime } = entry;
    const fd = new FormData();
    fd.append("file", file);

    if (targetMime === "application/pdf") {
      fd.append("options", JSON.stringify({ margin: 40 }));
      const { data } = await convertToPdf(fd);
      return data.metadata;
    }

    fd.append(
      "options",
      JSON.stringify({
        targetMime,
        resize: { strip: true },
        quality: 85,
      }),
    );
    const { data } = await convertToPdf(fd);
    return data.metadata;
  };

  const handleConvertAll = async () => {
    const pending = entries.filter((e) => e.targetMime && e.status !== "done");
    if (pending.length === 0) return;

    setConverting(true);
    await Promise.allSettled(
      pending.map(async (entry) => {
        updateEntry(setEntries, entry.id, { status: "converting" });
        try {
          const result = await convertOne(entry);
          updateEntry(setEntries, entry.id, { status: "done", result });
        } catch (err) {
          const msg = err.response?.data?.message ?? "Conversion failed";
          updateEntry(setEntries, entry.id, { status: "error", error: msg });
        }
      }),
    );
    setConverting(false);
  };

  const updateEntry = (setEntries, id, patch) =>
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );

  const ACCEPTED = ".jpg,.jpeg,.png,.webp,.avif,.gif,.tiff,.bmp,.svg,.pdf";

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [entries, setEntries] = useState([]);
  // const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const [converting, setConverting] = useState(false);

  const addFiles = async (incoming) => {
    if (entries === 10) return toast.error("Limit 10 files each");

    const existingIds = new Set(entries.map((e) => e.id));

    const newFiles = [...incoming].filter(
      (f) => !existingIds.has(`${f.name}-${f.size}`),
    );
    if (newFiles.length === 0) return;
    const newEntries = newFiles.map(createEntry);
    setEntries((prev) => [...prev, ...newEntries]);

    try {
      const results = await detectFiles(newFiles);
      results.forEach((r) => {
        if (!r.success) return;
        const matchedFile = newFiles.find((f) => f.name === r.filename);
        if (!matchedFile) return;
        const id = `${r.filename}-${matchedFile.size}`;
        const allowedMimes = flattenSuggest(r.suggestConvert);
        updateEntry(setEntries, id, { sourceMime: r.mimeType, allowedMimes });
      });
    } catch (err) {
      console.error("detectFile failed:", err);
    }
  };

  const removeEntry = (id) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  const setTargetMime = (id, mime) =>
    updateEntry(setEntries, id, {
      targetMime: mime,
      status: "idle",
      result: null,
      error: null,
    });

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    addFiles(e.dataTransfer.files);
  };

  // ── derived ──
  const hasFiles = entries.length > 0;
  const readyCount = entries.filter(
    (e) => e.targetMime && e.status !== "done",
  ).length;
  const doneCount = entries.filter((e) => e.status === "done").length;
  const hasAnyResult = doneCount > 0;

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        className={`rounded-2xl transition-all ${drag ? "bg-blue-50 border-2 border-dashed border-blue-300" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />

        {!hasFiles ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center py-12 text-center gap-16">
            <div className="flex items-center shadow-sm rounded-lg overflow-hidden">
              <button
                onClick={() => inputRef.current?.click()}
                className="px-7 py-2.5 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 active:scale-[0.98] transition-all cursor-pointer"
              >
                Select File
              </button>
              <div
                onClick={() => inputRef.current?.click()}
                className="bg-zinc-900 hover:bg-zinc-700 px-3 h-10 flex justify-center items-center cursor-pointer border-l border-zinc-700 transition-colors"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="text-white shrink-0"
                >
                  <path
                    d="M2 3.5l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-10 text-left w-full">
              {FEATURES.map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-6 items-start">
                  <div className="text-zinc-800 shrink-0 mt-1">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full py-4">
            <div className="space-y-2 mb-4">
              {entries.map((entry) => (
                <FileRow
                  key={entry.id}
                  file={entry.file}
                  targetMime={entry.targetMime}
                  allowedMimes={entry.allowedMimes}
                  status={entry.status}
                  result={entry.result}
                  error={entry.error}
                  onRemove={() => removeEntry(entry.id)}
                  onFormatChange={(mime) => setTargetMime(entry.id, mime)}
                />
              ))}
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
              <button
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 px-2 py-1.5 rounded-md hover:bg-zinc-100 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2v10M2 7h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Add more files
              </button>

              <div className="flex items-center gap-3">
                {/* Summary */}
                {hasAnyResult && (
                  <span className="text-xs text-green-600 font-mono">
                    {doneCount}/{entries.length} done
                  </span>
                )}
                {!hasAnyResult && (
                  <span className="text-xs text-zinc-400 font-mono">
                    {entries.length} file{entries.length > 1 ? "s" : ""}
                    {readyCount > 0 && ` · ${readyCount} ready`}
                  </span>
                )}

                <button
                  onClick={handleConvertAll}
                  disabled={converting || readyCount === 0}
                  className="px-5 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {converting
                    ? "Converting..."
                    : `Convert${readyCount > 1 ? ` ${readyCount} files` : ""} →`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
