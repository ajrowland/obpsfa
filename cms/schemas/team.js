import { MdPeopleOutline } from "react-icons/md";

export default {
  name: "team",
  title: "Team",
  type: "document",
  icon: MdPeopleOutline,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "venue",
      title: "Venue",
      type: "string",
    },
    {
      name: "badge",
      title: "Badge",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
    {
      name: "accentColor",
      title: "Accent colour",
      type: "color",
      description: "Used for various design cues",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "badge",
    },
  },
};
