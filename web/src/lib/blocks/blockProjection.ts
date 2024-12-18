export const blockProjection = (
  additionalBlocks: String[] = [],
  withMarks = true,
) => {
  return /* groq */ `{
    ...
    ${
      withMarks
        ? `,
    markDefs[] {
      ...,
      _type == "link" => {
        "page": reference-> {
          "slug": slug.current,
          date,
          isArchived
        }
      }
    }`
        : ""
    }
    ${additionalBlocks.length > 0 ? `,${additionalBlocks.join(",")}` : ""}
  }`;
};
