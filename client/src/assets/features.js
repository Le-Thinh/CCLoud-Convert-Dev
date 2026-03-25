import { IconFormats, IconSecurity, IconQuality, IconSpeed } from ".";

export const FEATURES = [
  {
    Icon: IconFormats,
    title: "20+ Formats Supported",
    desc: "CCloud Dev is your universal app for file conversions. We support nearly all audio, video, document, ebook, archive, image, spreadsheet, and presentation formats. Plus, you can use our online tool without downloading any software.",
  },
  {
    Icon: IconSecurity,
    title: "Secure & Private",
    desc: "CCLoud Dev is ISO 27001 certified and has been trusted by our users and customers since its founding in 2012. No one except you will ever have access to your files. We earn money by selling access to our API, not by selling your data. Read more about that in our Security Overview.",
  },

  {
    Icon: IconQuality,
    title: "High Quality Conversions",
    desc: "Besides using open source software under the hood, we’ve partnered with various software vendors to provide the best possible results. Most conversion types can be adjusted to your needs such as setting the quality and many other options.",
  },
  {
    Icon: IconSpeed,
    title: "API Fast",
    desc: "Our API allows custom integrations with your app. You pay only for what you actually use, and there are huge discounts for high-volume customers. We provide a lot of handy features such as full Amazon S3 integration. Check out the CCLoud Dev API.",
  },
];

export const STATUS_CONFIG = {
  idle: null,
  converting: {
    label: "Converting...",
    cls: "bg-blue-50 text-blue-600 border-blue-200",
    dot: "bg-blue-500 animate-pulse",
  },
  done: {
    label: "Done",
    cls: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  error: {
    label: "Failed",
    cls: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
  },
};
