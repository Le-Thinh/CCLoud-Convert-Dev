import React, { useEffect, useState } from "react";
import { DEFAULT_OPTS, FIT_OPTIONS } from "../../assets/OptionsModal";
import OkayButton from "../ui/button/OkayButton";
import RatioButton from "../ui/button/RatioButton";

const TransformOptionsModal = ({
  isOpen,
  onClose,
  initialOpts = {},
  filename,
  targetMime,
  onApply,
  onApplyAll,
}) => {
  const [opts, setOpts] = useState({ ...DEFAULT_OPTS, ...initialOpts });

  useEffect(() => {
    if (isOpen) setOpts({ ...DEFAULT_OPTS, ...initialOpts });
  }, [isOpen, filename]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const set = (key, val) => setOpts((prev) => ({ ...prev, [key]: val }));

  const buildResult = () => {
    const result = {};
    if (opts.width || opts.height) {
      result.resize = {
        ...(opts.width && { width: parseInt(opts.width) }),
        ...(opts.height && { height: parseInt(opts.height) }),
        fit: opts.fit,
        strip: opts.strip,
      };
    } else if (opts.strip) {
      result.resize = { strip: true };
    }
    if (opts.quality) result.quality = parseInt(opts.quality);
    if (opts.autoOrient) result.autoOrient = true;
    return result;
  };

  const fitDesc = FIT_OPTIONS.find((f) => f.value === opts.fit)?.desc;

  const isPng = targetMime === "image/png";
  const qualityDesc = isPng
    ? "Zlib compression level (quality / 10) and filter-type (quality % 10)."
    : "Quality level for lossy compression. Higher = better quality, larger file.";

  if (!isOpen) return null;

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
          <h2 className="text-xl font-semibold text-zinc-900">Options</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-0">
          {/* Row: Width + Height */}
          <div className="grid grid-cols-2 gap-8 pb-6 border-b border-zinc-100">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Width
              </label>
              <input
                type="number"
                value={opts.width}
                onChange={(e) => set("width", e.target.value)}
                placeholder=""
                className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
              />
              <p className="text-xs text-zinc-400 mt-1.5">
                Output width in pixels.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Height
              </label>
              <input
                type="number"
                value={opts.height}
                onChange={(e) => set("height", e.target.value)}
                placeholder=""
                className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
              />
              <p className="text-xs text-zinc-400 mt-1.5">
                Output height in pixels.
              </p>
            </div>
          </div>

          {/* Row: Fit + Strip */}
          <div className="grid grid-cols-2 gap-8 py-6 border-b border-zinc-100">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Fit
              </label>
              <select
                value={opts.fit}
                onChange={(e) => set("fit", e.target.value)}
                className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-zinc-400 bg-white"
              >
                {FIT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              {fitDesc && (
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {fitDesc}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Strip
              </label>
              <RatioButton
                value={opts.strip}
                onChange={(v) => set("strip", v)}
              />
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Remove any metadata such as EXIF data.
              </p>
            </div>
          </div>

          {/* Row: Quality + Auto Orient */}
          {targetMime === "image/png" && (
            <div className="grid grid-cols-2 gap-8 py-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Quality
                </label>
                <input
                  type="number"
                  value={opts.quality}
                  onChange={(e) => set("quality", e.target.value)}
                  placeholder="80"
                  min={1}
                  max={100}
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
                />
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  {qualityDesc}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-3">
                  Auto orient
                </label>
                <RatioButton
                  value={opts.autoOrient}
                  onChange={(v) => set("autoOrient", v)}
                />
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Automatically rotate the image based on EXIF orientation data
                  from the camera.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-8 py-4 border-t border-zinc-100">
          <OkayButton
            onApply={() => {
              onApply(buildResult());
              onClose();
            }}
            onApplyAll={() => {
              onApplyAll(buildResult());
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TransformOptionsModal;
