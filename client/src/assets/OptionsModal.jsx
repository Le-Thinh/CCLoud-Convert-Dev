export const FIT_OPTIONS = [
  {
    value: "max",
    label: "max",
    desc: '"Max" resizes the image to fit within the width and height, but will not increase the size of the image if it is smaller than width or height.',
  },
  {
    value: "crop",
    label: "crop",
    desc: '"Crop" resizes the image to fill the width and height dimensions and crops any excess image data.',
  },
  {
    value: "scale",
    label: "scale",
    desc: '"Scale" enforces the image width and height by scaling.',
  },
];

export const DEFAULT_OPTS = {
  width: "",
  height: "",
  fit: "max",
  strip: false,
  quality: "",
  autoOrient: true,
};
