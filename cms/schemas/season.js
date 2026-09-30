import { MdCalendarMonth } from "react-icons/md";

export default {
  name: "season",
  title: "Season",
  type: "document",
  icon: MdCalendarMonth,
  fields: [
    {
      name: "date",
      title: "Date",
      type: "date",
    },
  ],
  preview: {
    select: {
      date: "date",
    },
    prepare(selection) {
      const { date } = selection;
      const year = Number.parseInt(date.split("-")[0]);
      return {
        title: `${year} - ${year + 1}`,
      };
    },
  },
};
