// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import category from './category'
import home from './home'
import archive from './archive'
import page from './page'
import author from './author'
import fixtureList from './fixtureList'
import team from './team'
import season from './season'
import fixture from './fixture'
import seo from './seo'
import extendedImage from './extendedImage'
import iframe from './iframe'
import gallery from './gallery'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    home,
    archive,
    page,
    author,
    category,
    fixtureList,
    team,
    season,
    fixture,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    seo,
    extendedImage,
    iframe,
    gallery
  ])
})
