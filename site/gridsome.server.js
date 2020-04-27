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
    store.addMetadata('siteEmail', 'info@odpsfa.co.uk')

    const santityPageCollection = store.getCollection('SanityPage')
    const pages = santityPageCollection.data()

    /*pages.forEach(page => {
      if (page.parent) {
        console.log(page.title, page.parent._ref)
      }
    });*/

    store.addSchemaResolvers({
      SanityPage: {
        parentId: {
          type: 'String',
          resolve(obj) {
            return obj.parent ? obj.parent._ref : ''
          }
        }
      }
    })
  })
}

/*
module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
*/

