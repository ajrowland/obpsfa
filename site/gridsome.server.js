// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const clientConfig = require('./client-config')

module.exports = function(api) {
  api.loadSource(store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    store.addMetadata('sanityOptions', clientConfig.sanity)
    store.addMetadata('siteTwitterName', 'odpsfa')
    store.addMetadata('siteEmail', 'mail@obpsfa.com')

    //const santityPageCollection = store.getCollection('SanityPage')
    //const pages = santityPageCollection.data()

    /*pages.forEach(page => {
      if (page.parent) {
        console.log(page.title, page.parent._ref)
      }
    });

    store.addSchemaResolvers({
      SanityPage: {
        parentId: {
          type: 'String',
          resolve(obj) {
            return obj.parent ? obj.parent._ref : ''
          }
        }
      }
    })*/
  })

  api.onCreateNode(node => {
    if (node.internal.typeName === 'SanityPage' || node.internal.typeName === 'SanityArchive') {
      return {
        ...node,
        path: node.isArchived ? `/archive/${node.date}-${api._app.slugify(node.title)}` : (node.slug ? `/${node.slug.current}` : `/${api._app.slugify(node.title)}`)
      }
    }

    return node
  })

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allSanityPage {
        edges {
          node {
            path
            date
            title
            _rawBody(resolveReferences: {maxDepth: 5})
            mainImage {
              alt
              caption
              attribution
              asset {
                _id
                url
              }
            }
            slug {
              current
            }
            seo {
              description
              author {
                name
              }
              authorDisplay
              image {
                asset {
                  url
                }
              }
            }
            isArchived
          }
        }
      }
      metadata {
        siteTwitterName
        siteUrl
      }
    }`)

    const metadata = JSON.parse(JSON.stringify(data.metadata))

    data.allSanityPage.edges.forEach(({ node }) => {
      const doc = JSON.parse(JSON.stringify(node))
      const template = doc.isArchived ? 'PageArchived' : 'Page'

      createPage({
        path: doc.path,
        component: `./src/templates/${template}.vue`,
        context: {
          ...doc,
          metadata: {
            ...metadata
          }
        }
      })
    })
  })
}
