export const blockProjection = (
  additionalBlocks: String[] = [],
  withMarks = true,
) => {
  return /* groq */ `{
    ...
    ${withMarks ? ",markDefs[] { ... }" : ""}
    ${additionalBlocks.length > 0 ? `,${additionalBlocks.join(",")}` : ""}
  }`;
};
