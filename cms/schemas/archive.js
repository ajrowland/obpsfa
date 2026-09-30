import { MdHome } from "react-icons/md";

export default {
  name: "archive",
  title: "Archive",
  type: "document",
  icon: MdHome,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "extendedImage",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "seo",
      title: "SEO information",
      type: "seo",
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "seo.author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
};
