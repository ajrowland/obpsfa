export const faqsProjection = `{
  _type,
  title,
  items[] {
    question,
    answer
  }
}`;
