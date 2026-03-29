"use strict";

const FORMATS = {
  /*BEGIN: IMAGE */
  image: {
    "3fr": {
      extension: "3fr",
      mimeType: "image/x-hasselblad-3fr",
      label: "3FR",
      fullName: "Hasselblad RAW Image",
      category: "image",
      subcategory: "raw",
      description:
        "Ảnh RAW từ máy ảnh Hasselblad, chứa dữ liệu cảm biến chưa xử lý",
    },

    arw: {
      extension: "arw",
      mimeType: "image/x-sony-arw",
      label: "ARW",
      fullName: "Sony Alpha RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW của máy ảnh Sony Alpha",
    },

    avif: {
      extension: "avif",
      mimeType: "image/avif",
      label: "AVIF",
      fullName: "AV1 Image File Format",
      category: "image",
      subcategory: "raster",
      description: "Next-gen format, best compression",
    },

    bmp: {
      extension: "bmp",
      mimeType: "image/bmp",
      label: "BMP",
      fullName: "Bitmap Image File",
      category: "image",
      subcategory: "raster",
      description: "Uncompressed, large file size",
    },

    cr2: {
      extension: "cr2",
      mimeType: "image/x-canon-cr2",
      label: "CR2",
      fullName: "Canon RAW Image (CR2)",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW thế hệ cũ của Canon, dựa trên TIFF",
    },

    cr3: {
      extension: "cr3",
      mimeType: "image/x-canon-cr3",
      label: "CR3",
      fullName: "Canon RAW Image (CR3)",
      category: "image",
      subcategory: "raw",
      description:
        "Ảnh RAW Canon thế hệ mới, dựa trên ISO Base Media File Format",
    },

    crw: {
      extension: "crw",
      mimeType: "image/x-canon-crw",
      label: "CRW",
      fullName: "Canon RAW Image (CRW)",
      category: "image",
      subcategory: "raw",
      description: "Định dạng RAW Canon rất cũ, đã ngừng sử dụng",
    },

    dcr: {
      extension: "dcr",
      mimeType: "image/x-kodak-dcr",
      label: "DCR",
      fullName: "Kodak RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW từ máy ảnh kỹ thuật số Kodak",
    },

    dng: {
      extension: "dng",
      mimeType: "image/x-adobe-dng",
      label: "DNG",
      fullName: "Digital Negative",
      category: "image",
      subcategory: "raw",
      description: "Định dạng RAW mở do Adobe đề xuất, hỗ trợ rộng rãi",
    },

    eps: {
      extension: "eps",
      mimeType: "application/postscript",
      label: "EPS",
      fullName: "Encapsulated PostScript",
      category: "image",
      subcategory: "vector",
      description: "Vector format for printing",
    },

    erf: {
      extension: "erf",
      mimeType: "image/x-epson-erf",
      label: "ERF",
      fullName: "Epson RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW từ máy ảnh Epson",
    },

    gif: {
      extension: "gif",
      mimeType: "image/gif",
      label: "GIF",
      fullName: "Graphics Interchange Format",
      category: "image",
      subcategory: "raster",
      description: "Animation support, 256 colors",
    },

    heic: {
      extension: "heic",
      mimeType: "image/heic",
      label: "HEIC",
      fullName: "High Efficiency Image Container",
      category: "image",
      subcategory: "raster",
      description: "Apple's format, efficient compression",
    },

    heif: {
      extension: "heif",
      mimeType: "image/heif",
      label: "HEIF",
      fullName: "High Efficiency Image File Format",
      category: "image",
      subcategory: "container",
      description:
        "Định dạng ảnh hiệu quả cao, chất lượng tốt với dung lượng nhỏ",
    },

    icns: {
      extension: "icns",
      mimeType: "image/x-icns",
      label: "ICNS",
      fullName: "Apple Icon Image",
      category: "image",
      subcategory: "icon",
      description:
        "Định dạng icon của macOS, chứa nhiều kích thước và độ phân giải",
    },

    ico: {
      extension: "ico",
      mimeType: "image/x-icon",
      label: "ICO",
      fullName: "Windows Icon",
      category: "image",
      subcategory: "raster",
      description: "Windows icon format, multiple sizes",
    },

    ifif: {
      extension: "ifif",
      mimeType: "image/x-ifif",
      label: "IFIF",
      fullName: "Interchange File Image Format",
      category: "image",
      subcategory: "bitmap",
      description: "Định dạng ảnh bitmap cũ, rất hiếm gặp",
    },

    jpeg: {
      extension: "jpeg",
      mimeType: "image/jpeg",
      label: "JPEG",
      fullName: "Joint Photographic Experts Group",
      category: "image",
      subcategory: "raster",
      description: "Ảnh nén lossy, phổ biến trên web và máy ảnh",
    },

    jpg: {
      extension: "jpg",
      mimeType: "image/jpeg",
      label: "JPG",
      fullName: "Joint Photographic Experts Group",
      category: "image",
      subcategory: "raster",
      aliases: ["jpeg"],
      description: "Most widely used, good compression",
    },

    mos: {
      extension: "mos",
      mimeType: "image/x-leaf-mos",
      label: "MOS",
      fullName: "Leaf RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW từ máy ảnh medium format Leaf",
    },
    mrw: {
      extension: "mrw",
      mimeType: "image/x-minolta-mrw",
      label: "MRW",
      fullName: "Minolta RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW của máy ảnh Konica Minolta",
    },

    nef: {
      extension: "nef",
      mimeType: "image/x-nikon-nef",
      label: "NEF",
      fullName: "Nikon Electronic Format",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW của máy ảnh Nikon",
    },

    odd: {
      extension: "odd",
      mimeType: "application/vnd.oasis.opendocument.database",
      label: "ODD",
      fullName: "OpenDocument Database",
      category: "document",
      subcategory: "database",
      description: "Cơ sở dữ liệu theo chuẩn OpenDocument",
    },

    odg: {
      extension: "odg",
      mimeType: "application/vnd.oasis.opendocument.graphics",
      label: "ODG",
      fullName: "OpenDocument Graphics",
      category: "document",
      subcategory: "graphics",
      description: "Tài liệu đồ họa vector theo chuẩn OpenDocument",
    },

    orf: {
      extension: "orf",
      mimeType: "image/x-olympus-orf",
      label: "ORF",
      fullName: "Olympus RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW từ máy ảnh Olympus",
    },

    pef: {
      extension: "pef",
      mimeType: "image/x-pentax-pef",
      label: "PEF",
      fullName: "Pentax RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW từ máy ảnh Pentax",
    },

    png: {
      extension: "png",
      mimeType: "image/png",
      label: "PNG",
      fullName: "Portable Network Graphics",
      category: "image",
      subcategory: "raster",
      description: "Lossless compression, transparency support",
    },

    ppm: {
      extension: "ppm",
      mimeType: "image/x-portable-pixmap",
      label: "PPM",
      fullName: "Portable Pixmap Format",
      category: "image",
      subcategory: "bitmap",
      description:
        "Định dạng ảnh bitmap rất đơn giản, thường dùng trong xử lý ảnh",
    },

    ps: {
      extension: "ps",
      mimeType: "application/postscript",
      label: "PS",
      fullName: "PostScript File",
      category: "document",
      subcategory: "page-description",
      description:
        "Ngôn ngữ mô tả trang, thường dùng trong in ấn và xuất file đồ họa",
    },

    psd: {
      extension: "psd",
      mimeType: "image/vnd.adobe.photoshop",
      label: "PSD",
      fullName: "Photoshop Document",
      category: "image",
      subcategory: "professional",
      description: "Adobe Photoshop native format",
    },

    pub: {
      extension: "pub",
      mimeType: "application/vnd.ms-publisher",
      label: "PUB",
      fullName: "Microsoft Publisher Document",
      category: "document",
      subcategory: "desktop-publishing",
      description: "Tài liệu dàn trang của Microsoft Publisher",
    },

    raf: {
      extension: "raf",
      mimeType: "image/x-fuji-raf",
      label: "RAF",
      fullName: "Fujifilm RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW từ máy ảnh Fujifilm",
    },

    raw: {
      extension: "raw",
      mimeType: "image/x-raw",
      label: "RAW",
      fullName: "Generic RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW chung, không gắn với hãng máy ảnh cụ thể",
    },

    rw2: {
      extension: "rw2",
      mimeType: "image/x-panasonic-rw2",
      label: "RW2",
      fullName: "Panasonic RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW từ máy ảnh Panasonic Lumix",
    },

    tif: {
      extension: "tif",
      mimeType: "image/tiff",
      label: "TIF",
      fullName: "Tagged Image File Format",
      category: "image",
      subcategory: "raster",
      description: "Ảnh chất lượng cao, hỗ trợ lossless, phổ biến trong in ấn",
    },
    tiff: {
      extension: "tiff",
      mimeType: "image/tiff",
      label: "TIFF",
      fullName: "Tagged Image File Format",
      category: "image",
      subcategory: "raster",
      aliases: ["tif"],
      description: "High quality, used in professional photography",
    },

    webp: {
      extension: "webp",
      mimeType: "image/webp",
      label: "WEBP",
      fullName: "WebP Image",
      category: "image",
      subcategory: "raster",
      description: "Modern format, superior compression",
    },

    x3f: {
      extension: "x3f",
      mimeType: "image/x-sigma-x3f",
      label: "X3F",
      fullName: "Sigma RAW Image",
      category: "image",
      subcategory: "raw",
      description: "Ảnh RAW từ máy ảnh Sigma (cảm biến Foveon)",
    },

    xcf: {
      extension: "xcf",
      mimeType: "image/x-xcf",
      label: "XCF",
      fullName: "GIMP Image File",
      category: "image",
      subcategory: "editable",
      description: "File dự án của GIMP, chứa layer, mask và metadata",
    },

    xps: {
      extension: "xps",
      mimeType: "application/vnd.ms-xpsdocument",
      label: "XPS",
      fullName: "XML Paper Specification",
      category: "document",
      subcategory: "fixed-layout",
      description: "Định dạng tài liệu cố định của Microsoft, tương tự PDF",
    },
  },
  /*END: IMAGE */

  /*BEGIN: DOCUMENT */
  document: {
    abw: {
      extension: "abw",
      mimeType: "application/x-abiword",
      label: "ABW",
      fullName: "AbiWord Document",
      category: "document",
      subcategory: "word-processor",
      description: "",
    },

    djvu: {
      extension: "djvu",
      mimeType: "image/vnd.djvu",
      label: "DJVU",
      fullName: "DjVu Document",
      category: "document",
      subcategory: "scanned",
      description:
        "Định dạng tài liệu quét, nén rất tốt, thường dùng cho sách và tài liệu số hóa",
    },

    doc: {
      extension: "doc",
      mimeType: "application/msword",
      label: "DOC",
      fullName: "Microsoft Word 97-2003 Document",
      category: "document",
      subcategory: "word-processor",
      description: "Legacy Word format",
    },

    docm: {
      extension: "docm",
      mimeType: "application/vnd.ms-word.document.macroEnabled.12",
      label: "DOCM",
      fullName: "Microsoft Word Macro-Enabled Document",
      category: "document",
      subcategory: "word-processor",
      description: "Tài liệu Word hỗ trợ macro VBA, có thể chứa mã tự động",
    },

    docx: {
      extension: "docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      label: "DOCX",
      fullName: "Microsoft Word Document",
      category: "document",
      subcategory: "word-processor",
      description: "Modern Word format (Office 2007+)",
    },

    dot: {
      extension: "dot",
      mimeType: "application/msword",
      label: "DOT",
      fullName: "Microsoft Word Template",
      category: "document",
      subcategory: "template",
      description: "Mẫu tài liệu Word cũ, dùng để tạo các file .doc",
    },

    dotx: {
      extension: "dotx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
      label: "DOTX",
      fullName: "Microsoft Word Open XML Template",
      category: "document",
      subcategory: "template",
      description: "Mẫu Word hiện đại, không hỗ trợ macro",
    },

    html: {
      extension: "html",
      mimeType: "text/html",
      label: "HTML",
      fullName: "HyperText Markup Language",
      category: "document",
      subcategory: "markup",
      description: "Ngôn ngữ đánh dấu dùng để xây dựng trang web",
    },

    hwp: {
      extension: "hwp",
      mimeType: "application/vnd.hancom.hwp",
      label: "HWP",
      fullName: "Hangul Word Processor Document",
      category: "document",
      subcategory: "word-processing",
      description: "Định dạng soạn thảo văn bản của Hàn Quốc (Hancom)",
    },

    lwp: {
      extension: "lwp",
      mimeType: "application/vnd.lotus-wordpro",
      label: "LWP",
      fullName: "Lotus Word Pro Document",
      category: "document",
      subcategory: "word-processing",
      description:
        "Định dạng văn bản của Lotus Word Pro (IBM Lotus), hiện đã lỗi thời",
    },

    md: {
      extension: "md",
      mimeType: "text/markdown",
      label: "Markdown",
      fullName: "Markdown Document",
      category: "document",
      subcategory: "markup",
      description:
        "Định dạng văn bản nhẹ, dễ đọc, phổ biến trong tài liệu kỹ thuật",
    },

    odt: {
      extension: "odt",
      mimeType: "application/vnd.oasis.opendocument.text",
      label: "ODT",
      fullName: "OpenDocument Text",
      category: "document",
      subcategory: "word-processor",
      description: "Open standard document format",
    },

    pages: {
      extension: "pages",
      mimeType: "application/vnd.apple.pages",
      label: "PAGES",
      fullName: "Apple Pages Document",
      category: "document",
      subcategory: "word-processing",
      description: "Định dạng tài liệu của Apple Pages trên macOS và iOS",
    },

    pdf: {
      extension: "pdf",
      mimeType: "application/pdf",
      label: "PDF",
      fullName: "Portable Document Format",
      category: "document",
      subcategory: "fixed-layout",
      description: "Universal document format",
    },

    rst: {
      extension: "rst",
      mimeType: "text/x-rst",
      label: "RST",
      fullName: "reStructuredText Document",
      category: "document",
      subcategory: "markup",
      description: "Định dạng đánh dấu dùng nhiều trong tài liệu Python",
    },

    rtf: {
      extension: "rtf",
      mimeType: "application/rtf",
      label: "RTF",
      fullName: "Rich Text Format",
      category: "document",
      subcategory: "word-processor",
      description: "Cross-platform text format",
    },

    tex: {
      extension: "tex",
      mimeType: "application/x-tex",
      label: "TEX",
      fullName: "LaTeX Source Document",
      category: "document",
      subcategory: "typesetting",
      description: "Nguồn LaTeX dùng để soạn thảo tài liệu học thuật",
    },

    txt: {
      extension: "txt",
      mimeType: "text/plain",
      label: "TXT",
      fullName: "Plain Text",
      category: "document",
      subcategory: "text",
      description: "Unformatted text file",
    },

    wpd: {
      extension: "wpd",
      mimeType: "application/vnd.wordperfect",
      label: "WPD",
      fullName: "WordPerfect Document",
      category: "document",
      subcategory: "word-processing",
      description: "Định dạng văn bản của WordPerfect",
    },

    wps: {
      extension: "wps",
      mimeType: "application/vnd.ms-works",
      label: "WPS",
      fullName: "Microsoft Works / Kingsoft WPS Document",
      category: "document",
      subcategory: "word-processing",
      description:
        "Định dạng văn bản của Microsoft Works hoặc WPS Office (tùy hệ)",
    },

    zabw: {
      extension: "zabw",
      mimeType: "application/x-abiword-compressed",
      label: "ZABW",
      fullName: "Compressed AbiWord Document",
      category: "document",
      subcategory: "word-processing",
      description: "File AbiWord được nén (gzip), dung lượng nhỏ hơn .abw",
    },
  },
  /*END: DOCUMENT */

  /*BEGIN: SPREADSHEET */
  spreadsheet: {
    csv: {
      extension: "csv",
      mimeType: "text/csv",
      label: "CSV",
      fullName: "Comma-Separated Values",
      category: "spreadsheet",
      subcategory: "spreadsheet",
      description: "Plain text data format",
    },

    et: {
      extension: "et",
      mimeType: "application/vnd.wps-office.et",
      label: "ET",
      fullName: "WPS Spreadsheets Document",
      category: "document",
      subcategory: "spreadsheet",
      description: "File bảng tính của WPS Office (Kingsoft)",
    },

    numbers: {
      extension: "numbers",
      mimeType: "application/vnd.apple.numbers",
      label: "NUMBERS",
      fullName: "Apple Numbers Spreadsheet",
      category: "document",
      subcategory: "spreadsheet",
      description: "File bảng tính của Apple Numbers trên macOS và iOS",
    },

    ods: {
      extension: "ods",
      mimeType: "application/vnd.oasis.opendocument.spreadsheet",
      label: "ODS",
      fullName: "OpenDocument Spreadsheet",
      category: "spreadsheet",
      subcategory: "spreadsheet",
      description: "Open standard spreadsheet",
    },

    xls: {
      extension: "xls",
      mimeType: "application/vnd.ms-excel",
      label: "XLS",
      fullName: "Microsoft Excel 97-2003",
      category: "spreadsheet",
      subcategory: "spreadsheet",
      description: "Legacy Excel format",
    },

    xlsm: {
      extension: "xlsm",
      mimeType: "application/vnd.ms-excel.sheet.macroEnabled.12",
      label: "XLSM",
      fullName: "Microsoft Excel Macro-Enabled Workbook",
      category: "document",
      subcategory: "spreadsheet",
      description: "Workbook Excel hỗ trợ macro VBA, có thể chứa mã tự động",
    },

    xlsx: {
      extension: "xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      label: "XLSX",
      fullName: "Microsoft Excel Spreadsheet",
      category: "spreadsheet",
      subcategory: "spreadsheet",
      description: "Modern Excel format",
    },
  },
  /*END: SPREADSHEET */

  /*BEGIN: AUDIO */
  audio: {
    aac: {
      extension: "aac",
      mimeType: "audio/aac",
      label: "AAC",
      fullName: "Advanced Audio Coding",
      category: "audio",
      subcategory: "lossy",
      description:
        "Định dạng âm thanh nén chất lượng cao, phổ biến trên web và di động",
    },

    ac3: {
      extension: "ac3",
      mimeType: "audio/ac3",
      label: "AC3",
      fullName: "Dolby Digital Audio",
      category: "audio",
      subcategory: "lossy",
      description: "Âm thanh vòm Dolby Digital, thường dùng trong DVD",
    },

    aif: {
      extension: "aif",
      mimeType: "audio/x-aiff",
      label: "AIF",
      fullName: "Audio Interchange File Format",
      category: "audio",
      subcategory: "lossless",
      description: "Định dạng âm thanh không nén của Apple",
    },

    aifc: {
      extension: "aifc",
      mimeType: "audio/x-aiff",
      label: "AIFC",
      fullName: "Compressed AIFF",
      category: "audio",
      subcategory: "lossy",
      description: "Phiên bản AIFF có nén",
    },

    aiff: {
      extension: "aiff",
      mimeType: "audio/x-aiff",
      label: "AIFF",
      fullName: "Audio Interchange File Format",
      category: "audio",
      subcategory: "lossless",
      description: "Định dạng âm thanh không nén, phổ biến trên macOS",
    },

    amr: {
      extension: "amr",
      mimeType: "audio/amr",
      label: "AMR",
      fullName: "Adaptive Multi-Rate Audio",
      category: "audio",
      subcategory: "speech",
      description:
        "Định dạng tối ưu cho giọng nói, dùng nhiều trong viễn thông",
    },

    au: {
      extension: "au",
      mimeType: "audio/basic",
      label: "AU",
      fullName: "Sun AU Audio",
      category: "audio",
      subcategory: "lossy",
      description: "Định dạng âm thanh cũ của Sun Microsystems",
    },

    caf: {
      extension: "caf",
      mimeType: "audio/x-caf",
      label: "CAF",
      fullName: "Core Audio Format",
      category: "audio",
      subcategory: "container",
      description: "Container âm thanh của Apple, hỗ trợ nhiều codec",
    },

    dss: {
      extension: "dss",
      mimeType: "audio/vnd.dss",
      label: "DSS",
      fullName: "Digital Speech Standard",
      category: "audio",
      subcategory: "speech",
      description: "Định dạng ghi âm giọng nói chuyên dụng (ghi âm, hội thoại)",
    },

    flac: {
      extension: "flac",
      mimeType: "audio/flac",
      label: "FLAC",
      fullName: "Free Lossless Audio Codec",
      category: "audio",
      subcategory: "lossless",
      description: "Âm thanh nén không mất dữ liệu, chất lượng cao",
    },

    m4a: {
      extension: "m4a",
      mimeType: "audio/mp4",
      label: "M4A",
      fullName: "MPEG-4 Audio",
      category: "audio",
      subcategory: "container",
      description: "Âm thanh MPEG-4, thường dùng với codec AAC",
    },

    m4b: {
      extension: "m4b",
      mimeType: "audio/mp4",
      label: "M4B",
      fullName: "MPEG-4 Audiobook",
      category: "audio",
      subcategory: "container",
      description: "Định dạng audiobook MPEG-4, hỗ trợ chapter và bookmark",
    },

    mp3: {
      extension: "mp3",
      mimeType: "audio/mpeg",
      label: "MP3",
      fullName: "MPEG-1 Audio Layer III",
      category: "audio",
      subcategory: "lossy",
      description: "Định dạng âm thanh nén phổ biến nhất",
    },

    oga: {
      extension: "oga",
      mimeType: "audio/ogg",
      label: "OGA",
      fullName: "Ogg Audio",
      category: "audio",
      subcategory: "container",
      description: "Container Ogg dành cho âm thanh (Vorbis, Opus, FLAC)",
    },

    voc: {
      extension: "voc",
      mimeType: "audio/x-voc",
      label: "VOC",
      fullName: "Creative Voice File",
      category: "audio",
      subcategory: "lossy",
      description: "Định dạng âm thanh cũ của Sound Blaster",
    },

    wav: {
      extension: "wav",
      mimeType: "audio/wav",
      label: "WAV",
      fullName: "Waveform Audio File Format",
      category: "audio",
      subcategory: "lossless",
      description: "Âm thanh không nén, chất lượng cao",
    },

    weba: {
      extension: "weba",
      mimeType: "audio/webm",
      label: "WEBA",
      fullName: "WebM Audio",
      category: "audio",
      subcategory: "container",
      description: "Âm thanh WebM dùng cho web (Opus, Vorbis)",
    },

    wma: {
      extension: "wma",
      mimeType: "audio/x-ms-wma",
      label: "WMA",
      fullName: "Windows Media Audio",
      category: "audio",
      subcategory: "lossy",
      description:
        "Định dạng âm thanh của Microsoft, tối ưu cho hệ sinh thái Windows",
    },
  },
  /*END: AUDIO */

  /*BEGIN: VIDEO */
  video: {
    "3g2": {
      extension: "3g2",
      mimeType: "video/3gpp2",
      label: "3G2",
      fullName: "3GPP2 Multimedia File",
      category: "video",
      subcategory: "container",
      description:
        "Định dạng video cho mạng CDMA, dùng nhiều trên thiết bị di động cũ",
    },

    "3gp": {
      extension: "3gp",
      mimeType: "video/3gpp",
      label: "3GP",
      fullName: "3GPP Multimedia File",
      category: "video",
      subcategory: "container",
      description: "Định dạng video nhẹ cho điện thoại di động",
    },

    "3gpp": {
      extension: "3gpp",
      mimeType: "video/3gpp",
      label: "3GPP",
      fullName: "3GPP Multimedia File",
      category: "video",
      subcategory: "container",
      description: "Phiên bản mở rộng của 3GP, cùng chuẩn 3GPP",
    },

    avi: {
      extension: "avi",
      mimeType: "video/x-msvideo",
      label: "AVI",
      fullName: "Audio Video Interleave",
      category: "video",
      subcategory: "container",
      description:
        "Container video cũ của Microsoft, hỗ trợ nhiều codec khác nhau",
    },

    cavs: {
      extension: "cavs",
      mimeType: "video/x-cavs",
      label: "CAVS",
      fullName: "Chinese AVS Video",
      category: "video",
      subcategory: "codec",
      description: "Chuẩn video AVS của Trung Quốc, ít phổ biến quốc tế",
    },

    dv: {
      extension: "dv",
      mimeType: "video/x-dv",
      label: "DV",
      fullName: "Digital Video",
      category: "video",
      subcategory: "container",
      description: "Định dạng video kỹ thuật số dùng trong máy quay DV",
    },

    dvr: {
      extension: "dvr",
      mimeType: "video/x-ms-dvr",
      label: "DVR",
      fullName: "Digital Video Recorder File",
      category: "video",
      subcategory: "container",
      description: "File video ghi từ thiết bị DVR, thường có DRM",
    },

    flv: {
      extension: "flv",
      mimeType: "video/x-flv",
      label: "FLV",
      fullName: "Flash Video",
      category: "video",
      subcategory: "container",
      description: "Định dạng video của Adobe Flash, hiện đã lỗi thời",
    },

    m2ts: {
      extension: "m2ts",
      mimeType: "video/mp2t",
      label: "M2TS",
      fullName: "MPEG-2 Transport Stream",
      category: "video",
      subcategory: "container",
      description: "Định dạng video độ phân giải cao, dùng trong Blu-ray",
    },

    m4v: {
      extension: "m4v",
      mimeType: "video/x-m4v",
      label: "M4V",
      fullName: "MPEG-4 Video (Apple)",
      category: "video",
      subcategory: "container",
      description: "Định dạng video MPEG-4 của Apple, thường dùng trên iTunes",
    },

    mkv: {
      extension: "mkv",
      mimeType: "video/x-matroska",
      label: "MKV",
      fullName: "Matroska Video",
      category: "video",
      subcategory: "container",
      description:
        "Container video mạnh mẽ, hỗ trợ nhiều audio, subtitle và codec",
    },

    mod: {
      extension: "mod",
      mimeType: "video/mpeg",
      label: "MOD",
      fullName: "MPEG Program Stream (Camcorder)",
      category: "video",
      subcategory: "container",
      description: "Video MPEG-2 từ máy quay JVC, Panasonic, Canon",
    },

    mov: {
      extension: "mov",
      mimeType: "video/quicktime",
      label: "MOV",
      fullName: "QuickTime Movie",
      category: "video",
      subcategory: "container",
      description:
        "Định dạng video QuickTime của Apple, chất lượng cao, dùng nhiều trong dựng phim",
    },

    mp4: {
      extension: "mp4",
      mimeType: "video/mp4",
      label: "MP4",
      fullName: "MPEG-4 Part 14",
      category: "video",
      subcategory: "container",
      description: "Định dạng video phổ biến nhất hiện nay, tương thích cao",
    },

    mpeg: {
      extension: "mpeg",
      mimeType: "video/mpeg",
      label: "MPEG",
      fullName: "Moving Picture Experts Group Video",
      category: "video",
      subcategory: "container",
      description: "Video MPEG chuẩn, thường dùng cho DVD và truyền hình",
    },

    mpg: {
      extension: "mpg",
      mimeType: "video/mpeg",
      label: "MPG",
      fullName: "Moving Picture Experts Group Video",
      category: "video",
      subcategory: "container",
      description: "Biến thể phần mở rộng của MPEG",
    },

    mts: {
      extension: "mts",
      mimeType: "video/mp2t",
      label: "MTS",
      fullName: "AVCHD Video",
      category: "video",
      subcategory: "container",
      description: "Video AVCHD từ máy quay HD, dùng MPEG-2 transport stream",
    },

    mxf: {
      extension: "mxf",
      mimeType: "application/mxf",
      label: "MXF",
      fullName: "Material Exchange Format",
      category: "video",
      subcategory: "container",
      description: "Định dạng video chuyên nghiệp cho broadcast và hậu kỳ",
    },

    ogg: {
      extension: "ogg",
      mimeType: "video/ogg",
      label: "OGG",
      fullName: "Ogg Video",
      category: "video",
      subcategory: "container",
      description: "Container Ogg cho video (Theora, VP8, VP9)",
    },

    rm: {
      extension: "rm",
      mimeType: "application/vnd.rn-realmedia",
      label: "RM",
      fullName: "RealMedia File",
      category: "video",
      subcategory: "container",
      description: "Định dạng video của RealNetworks, đã lỗi thời",
    },

    rmvb: {
      extension: "rmvb",
      mimeType: "application/vnd.rn-realmedia-vbr",
      label: "RMVB",
      fullName: "RealMedia Variable Bitrate",
      category: "video",
      subcategory: "container",
      description: "Phiên bản RealMedia hỗ trợ bitrate biến thiên",
    },

    swf: {
      extension: "swf",
      mimeType: "application/x-shockwave-flash",
      label: "SWF",
      fullName: "Shockwave Flash Movie",
      category: "video",
      subcategory: "interactive",
      description: "Nội dung Flash (animation / video), hiện đã ngừng hỗ trợ",
    },

    ts: {
      extension: "ts",
      mimeType: "video/mp2t",
      label: "TS",
      fullName: "MPEG Transport Stream",
      category: "video",
      subcategory: "container",
      description: "Luồng video MPEG dùng trong truyền hình và streaming",
    },

    vob: {
      extension: "vob",
      mimeType: "video/dvd",
      label: "VOB",
      fullName: "DVD Video Object",
      category: "video",
      subcategory: "container",
      description: "File video trong đĩa DVD, chứa video, audio và subtitle",
    },

    webm: {
      extension: "webm",
      mimeType: "video/webm",
      label: "WEBM",
      fullName: "WebM Video",
      category: "video",
      subcategory: "container",
      description: "Định dạng video tối ưu cho web (VP8, VP9, AV1)",
    },

    wmv: {
      extension: "wmv",
      mimeType: "video/x-ms-wmv",
      label: "WMV",
      fullName: "Windows Media Video",
      category: "video",
      subcategory: "container",
      description: "Định dạng video của Microsoft, tối ưu cho Windows",
    },

    wtv: {
      extension: "wtv",
      mimeType: "video/x-ms-wtv",
      label: "WTV",
      fullName: "Windows Recorded TV Show",
      category: "video",
      subcategory: "container",
      description: "File video ghi từ Windows Media Center",
    },
  },
  /*END: VIDEO */
};

const SHARP_SUPPORTED_INPUTS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/tiff",
  "image/avif",
  "image/svg+xml",
  "image/bmp",
];

const SHARP_SUPPORTED_OUTPUTS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/tiff",
  "image/avif",
];

const PDF_EMBED_MAP = {
  "image/jpeg": "embedJpg",
  "image/jpg": "embedJpg",
  "image/png": "embedPng",
};

const CONVERSION_MATRIX = {
  /*BEGIN: IMAGE */
  "image/x-hasselblad-3fr": {
    convertTo: {
      // convert from 3FR, exam: 3FR to AVIF
      document: ["application/pdf"],
      image: [
        "image/avif",
        "image/bmp",
        "application/postscript", //eps
        "image/gif",
        "image/x-icon",
        "image/jpeg",
        "application/vnd.oasis.opendocument.database", //odd
        "image/png",
        "application/postscript", //ps
        "image/vnd.adobe.photoshop", //psd
        "image/tiff",
        "image/webp",
      ],
    },
    convertFrom: {},
  },
  "image/x-sony-arw": {
    convertTo: {
      document: ["application/pdf"],
      image: [
        "image/avif",
        "image/bmp",
        "application/postscript", //eps
        "image/gif",
        "image/x-icon",
        "image/jpeg",
        "application/vnd.oasis.opendocument.database", //odd
        "image/png",
        "application/postscript", //ps
        "image/vnd.adobe.photoshop", //psd
        "image/tiff",
        "image/webp",
      ],
    },
    convertFrom: {},
  },

  "image/avif": {
    convertTo: {
      document: ["application/pdf"],
      image: [
        "image/avif",
        "image/bmp",
        "application/postscript", //eps
        "image/gif",
        "image/x-icon",
        "image/jpeg",
        "application/vnd.oasis.opendocument.database", //odd
        "image/png",
        "application/postscript", //ps
        "image/vnd.adobe.photoshop", //psd
        "image/tiff",
        "image/webp",
      ],
    },
    convertFrom: {
      document: [],
      image: [
        "3fr",
        "arw",
        "avif",
        "bmp",
        "cr2",
        "cr3",
        "crw",
        "dcr",
        "dng",
        "emf",
        "eps",
        "gif",
        "heic",
        //...
      ],
    }, // convert to AVIF, exam: 3FR to AVIF
  },
  "image/bmp": {
    convertTo: {
      document: ["pdf"],
      image: [
        "avif",
        "bmp",
        "eps",
        "gif",
        "ico",
        "jpg",
        "odd",
        "png",
        "ps",
        "psd",
        "tiff",
        "webp",
      ],
    },
    convertFrom: {},
  },

  "image/x-canon-cr2": {
    convertTo: {
      document: ["application/pdf"],
      image: [
        "image/avif",
        "image/bmp",
        "application/postscript", //eps
        "image/gif",
        "image/x-icon",
        "image/jpeg",
        "application/vnd.oasis.opendocument.database", //odd
        "image/png",
        "application/postscript", //ps
        "image/vnd.adobe.photoshop", //psd
        "image/tiff",
        "image/webp",
      ],
    },
    convertFrom: {},
  },

  "image/x-canon-cr3": {
    convertTo: {
      document: ["application/pdf"],
      image: [
        "image/avif",
        "image/bmp",
        "application/postscript", //eps
        "gif",
        "image/x-icon",
        "image/jpeg",
        "application/vnd.oasis.opendocument.database", //odd
        "image/png",
        "application/postscript", //ps
        "image/vnd.adobe.photoshop", //psd
        "image/tiff",
        "image/webp",
      ],
    },
    convertFrom: {},
  },

  "image/x-canon-crw": {
    convertTo: {
      document: ["pdf"],
      image: [
        "image/avif",
        "image/bmp",
        "application/postscript", //eps
        "image/gif",
        "image/x-icon",
        "image/jpeg",
        "application/vnd.oasis.opendocument.database", //odd
        "image/png",
        "application/postscript", //ps
        "image/vnd.adobe.photoshop", //psd
        "image/tiff",
        "image/webp",
      ],
    },
    convertFrom: {},
  },

  // --------------------------------------//
  "image/png": {
    convertTo: {
      document: ["application/pdf"],
      image: [
        "image/avif",
        "image/bmp",
        "application/postscript", //eps
        "image/gif",
        "image/x-icon",
        "image/jpeg",
        "application/vnd.oasis.opendocument.database", //odd
        "image/png",
        "application/postscript", //ps
        "image/vnd.adobe.photoshop", //psd
        "image/tiff",
        "image/webp",
      ],
    },
    convertFrom: {},
  },

  "image/jpeg": {
    convertTo: {
      document: ["application/pdf"],
      image: [
        "image/avif",
        "image/bmp",
        "application/postscript", //eps
        "image/gif",
        "image/x-icon",
        "image/jpeg",
        "application/vnd.oasis.opendocument.database", //odd
        "image/png",
        "application/postscript", //ps
        "image/vnd.adobe.photoshop", //psd
        "image/tiff",
        "image/webp",
      ],
    },
    convertFrom: {},
  },
  /*END: IMAGE */
  /*BEGIN: DOCUMENT */
  "application/pdf": {
    convertTo: {
      document: [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/html",
        "text/rtf",
        "text/plain",
      ],
      image: [
        // "image/avif",
        // "image/bmp",
        // "application/postscript", //eps
        // "image/gif",
        // "image/x-icon",
        // "image/jpeg",
        // "application/vnd.oasis.opendocument.database", //odd
        // "image/png",
        // "application/postscript", //ps
        // "image/vnd.adobe.photoshop", //psd
        // "image/tiff",
        // "image/webp",
      ],
    },
    convertFrom: {},
  },

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    convertTo: {
      document: [
        "application/msword",
        "text/html",
        "application/vnd.oasis.opendocument.text",
        "application/pdf",
        "text/rtf",
        "text/plain",
      ],
      image: ["image/jpeg", "image/png", "application/vnd.ms-xpsdocument"],
    },
    convertFrom: {},
  },
  /*END: DOCUMENT */
};

/**
 *
 * @param {String} mimeType
 * @returns {Object}
 */
const getConversionSuggestion = (mimeType) => {
  const rules = CONVERSION_MATRIX[mimeType];

  return rules;
};

/**
 * Kiểm tra xem có thể convert từ sourceMime sang targetMime không
 * @param {String} sourceMime
 * @param {String} targetMime
 * @returns {boolean}
 */

const canConvert = (sourceMime, targetMime) => {
  const rules = CONVERSION_MATRIX[sourceMime];
  if (!rules || !rules.convertTo) return false;

  return Object.values(rules.convertTo).flat().includes(targetMime);
};

module.exports = {
  FORMATS,
  CONVERSION_MATRIX,
  getConversionSuggestion,
  canConvert,
  PDF_EMBED_MAP,
  SHARP_SUPPORTED_INPUTS,
  SHARP_SUPPORTED_OUTPUTS,
};
