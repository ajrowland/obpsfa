import { MdCrop169 } from "react-icons/md";
import IframePreview from "./previews/iframe";

export default {
  name: "iframe",
  title: "Iframe",
  type: "object",
  icon: MdCrop169,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "width",
      title: "Width",
      type: "number",
    },
    {
      name: "height",
      title: "Height",
      type: "number",
    },
  ],
  components: {
    select: { url: "url" },
    preview: IframePreview,
  },
};
