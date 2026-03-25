import React from "react";

const SubNavbar = () => {
  return (
    <div className="border-b border-zinc-100 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10 flex items-center gap-12">
        <div className="flex-1 max-w-lg">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-2">
            File Converter
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Convert.dev is an online file converter. We support nearly all
            audio, video, document, ebook, archive, image, spreadsheet, and
            presentation formats. To get started, use the button below and
            select files to convert from your computer.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm text-zinc-500">convert</span>
          {/* <FormatSelect value={fromFmt} onChange={setFromFmt} /> */}
          <span className="text-sm text-zinc-500">to</span>
          {/* <FormatSelect value={toFmt}   onChange={setToFmt} /> */}
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
