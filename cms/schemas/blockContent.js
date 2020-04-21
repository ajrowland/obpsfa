/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'Internal link',
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'home' },
                  { type: 'page' }
                ]
              },
              {
                title: 'OR external link',
                description: 'The internal link field will be prioritised. Remove if adding an external link.',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({
                  scheme: [ 'http', 'https', 'mailto', 'tel' ]
                })
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean'
              }
            ]
          }
        ]
      }
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'extendedImage'
    },
    {
      title: 'Fixture list',
      name: 'fixtureList',
      type: 'reference',
      to: { type: 'fixtureList' }
    }
  ]
}
