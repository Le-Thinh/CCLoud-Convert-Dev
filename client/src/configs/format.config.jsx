"use strict";

export const TOOLS_MENU = [
  {
    heading: "CONVERT FILES",
    icon: "↻",
    items: [
      { label: "Archive Converter", slug: "archive-converter", lock: true },
      { label: "Audio Converter", slug: "audio-converter", lock: true },
      { label: "CAD Converter", slug: "cad-converter", lock: true },
      { label: "Document Converter", slug: "document-converter", lock: true },
      { label: "Ebook Converter", slug: "ebook-converter", lock: true },
      { label: "Font Converter", slug: "font-converter", lock: true },
      { label: "Image Converter", slug: "image-converter", lock: false },
      {
        label: "Presentation Converter",
        slug: "presentation-converter",
        lock: false,
      },
      {
        label: "Spreadsheet Converter",
        slug: "spreadsheet-converter",
        lock: false,
      },
      { label: "Vector Converter", slug: "vector-converter", lock: true },
      { label: "Video Converter", slug: "video-converter", lock: true },
    ],
  },

  {
    heading: "OPTIMIZE FILES",
    icon: "⊞",
    items: [
      { label: "Compress PDF", slug: "compress-pdf", lock: true },
      { label: "Compress PNG", slug: "compress-png", lock: true },
      { label: "Compress JPG", slug: "compress-jpg", lock: true },
      { label: "PDF OCR", slug: "pdf-ocr", lock: true },
    ],
  },

  {
    heading: "MERGE FILES",
    icon: "⊞",
    items: [{ label: "Merge PDF", slug: "merge-pdf", lock: true }],
  },

  {
    heading: "CAPTURE WEBSITES",
    icon: "⊞",
    items: [
      {
        label: "Save Website as PDF",
        slug: "save-website-as-pdf",
        lock: true,
      },
      {
        label: "Website PNG Screenshot",
        slug: "website-png-screenshot",
        lock: true,
      },
      {
        label: "Website JPG Screenshot",
        slug: "website-jpg-screenshot",
        lock: true,
      },
    ],
  },

  {
    heading: "ARCHIVES",
    icon: "⊞",
    items: [
      { label: "Create Archive", slug: "create-archive", lock: true },
      { label: "Extract Archive", slug: "extract-archive", lock: true },
    ],
  },
];

export const API_MENU = [
  {
    heading: "CONVERT FILES",
    icon: "↻",
    items: [
      {
        label: "File Conversion API",
        slug: "api/file-conversion",
        lock: false,
      },
      { label: "Office to PDF API", slug: "api/office-to-pdf", lock: false },
      { label: "iWork to PDF API", slug: "api/iwork-to-pdf", lock: false },
      { label: "PDF to Office API", slug: "api/pdf-to-office", lock: false },
      { label: "Video Encoding API", slug: "api/video-encoding", lock: false },
    ],
  },

  {
    heading: "CAPTURE WEBSITES",
    icon: "↻",
    items: [
      {
        label: "HTML to PDF API",
        slug: "api/html-to-pdf",
        lock: false,
      },
      { label: "Web Screenshot API", slug: "api/web-screenshot", lock: false },
    ],
  },

  {
    heading: "OPTIMIZE FILES",
    icon: "⊞",
    items: [
      { label: "Compress PDF API", slug: "api/compress-pdf", lock: false },
      {
        label: "Compress Images API",
        slug: "api/compress-images",
        lock: false,
      },
    ],
  },

  {
    heading: "OTHER APIS",
    icon: "⊞",
    items: [
      { label: "Merge PDF API", slug: "api/merge-pdf", lock: true },
      { label: "Thumbnail API", slug: "api/thumbnail", lock: true },
      { label: "Watermark API", slug: "api/watermark", lock: true },
    ],
  },
  {
    heading: "DOCUMENTATION",
    icon: "⊞",
    items: [
      { label: "API Documentation", slug: "doc", lock: true },
      { label: "Quickstart Guide", slug: "doc/quickstart", lock: true },
      { label: "Job Builder", slug: "doc/job-builder", lock: true },
    ],
  },
];

export const FORMAT_OPTIONS = [
  "JPG",
  "PNG",
  "WEBP",
  "AVIF",
  "GIF",
  "TIFF",
  "BMP",
  "PDF",
];
export const FORMAT_CATEGORIES = [
  {
    label: "Image",
    formats: ["JPG", "PNG", "WEBP", "AVIF", "GIF", "TIFF", "BMP", "ICO", "SVG"],
  },
  {
    label: "Document",
    formats: ["PDF", "DOC", "DOCX", "HTML", "MD", "RTF", "TXT", "ODT"],
  },
  {
    label: "Spreadsheet",
    formats: ["XLS", "XLSX", "CSV", "ODS"],
  },
  {
    label: "Presentation",
    formats: ["PPT", "PPTX", "ODP"],
  },
  {
    label: "Ebook",
    formats: ["EPUB", "MOBI", "AZW3", "FB2"],
  },
  {
    label: "Vector",
    formats: ["SVG", "EPS", "AI", "PDF"],
  },
  {
    label: "Archive",
    formats: ["ZIP", "RAR", "7Z", "TAR", "GZ"],
  },
];

export const FORMAT_MIME_MAP = {
  // Image
  JPG: "image/jpeg",
  JPEG: "image/jpeg",
  PNG: "image/png",
  WEBP: "image/webp",
  AVIF: "image/avif",
  GIF: "image/gif",
  TIFF: "image/tiff",
  BMP: "image/bmp",
  ICO: "image/x-icon",
  SVG: "image/svg+xml",
  // Document
  PDF: "application/pdf",
  DOC: "application/msword",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  HTML: "text/html",
  MD: "text/markdown",
  RTF: "text/rtf",
  TXT: "text/plain",
  ODT: "application/vnd.oasis.opendocument.text",
  // Spreadsheet
  XLS: "application/vnd.ms-excel",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  CSV: "text/csv",
  ODS: "application/vnd.oasis.opendocument.spreadsheet",
  // Presentation
  PPT: "application/vnd.ms-powerpoint",
  PPTX: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ODP: "application/vnd.oasis.opendocument.presentation",
  // Ebook
  EPUB: "application/epub+zip",
  MOBI: "application/x-mobipocket-ebook",
  AZW3: "application/vnd.amazon.ebook",
  FB2: "application/x-fictionbook+xml",
  // Vector
  EPS: "application/postscript",
  AI: "application/postscript",
  // Archive
  ZIP: "application/zip",
  RAR: "application/vnd.rar",
  "7Z": "application/x-7z-compressed",
  TAR: "application/x-tar",
  GZ: "application/gzip",
};

const CONVERSION_MATRIX = {
  "image/jpeg": [
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
    "image/tiff",
    "image/bmp",
    "application/pdf",
  ],
  "image/png": [
    "image/jpeg",
    "image/webp",
    "image/avif",
    "image/gif",
    "image/tiff",
    "image/bmp",
    "application/pdf",
  ],
  "image/webp": [
    "image/jpeg",
    "image/png",
    "image/avif",
    "image/gif",
    "image/tiff",
    "image/bmp",
    "application/pdf",
  ],
  "image/avif": [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/tiff",
    "image/bmp",
    "application/pdf",
  ],
  "image/gif": [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/tiff",
    "image/bmp",
    "application/pdf",
  ],
  "image/tiff": [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
    "image/bmp",
    "application/pdf",
  ],
  "image/bmp": [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
    "image/tiff",
    "application/pdf",
  ],
  "application/pdf": [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/html",
    "text/rtf",
    "text/plain",
    "image/jpeg",
    "image/png",
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    "application/msword",
    "text/html",
    "application/vnd.oasis.opendocument.text",
    "application/pdf",
    "text/rtf",
    "text/plain",
    "image/jpeg",
    "image/png",
  ],
};

export const getAllowedTargets = (sourceMime) =>
  CONVERSION_MATRIX[sourceMime] ?? [];

export const getMime = (label) => FORMAT_MIME_MAP[label?.toUpperCase()] ?? null;

export const getLabel = (mime) =>
  Object.entries(FORMAT_MIME_MAP).find(([, v]) => v === mime)?.[0] ?? mime;
