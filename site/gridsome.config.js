// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/style/index.scss'),
      ],
    })
}

module.exports = {
  siteName: 'OBPSFA',
  siteUrl: 'https://www.obpsfa.com',
  siteTwitterName: 'odpsfa',

  templates: {
    SanityPage: [
      {
        path: (node) => {
          return `/${node.slug.current}`
        },
        component: './src/templates/Page.vue'
      }
    ]
  },

  plugins: [
    {
      use: 'gridsome-source-sanity',
      options: {
        ...clientConfig.sanity,
        typeName: 'Sanity',
        token: process.env.SANITY_TOKEN,
        overlayDrafts: !isProd,
        watchMode: !isProd

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        //graphqlTag: 'default',
      }
    },
    {
      use: 'gridsome-plugin-gtm',
      options: {
        id: 'GTM-W6XW753',
        enabled: true,
        debug: false
      }
    },
    {
      use: "gridsome-plugin-service-worker",
      options: {
        networkFirst: {
          routes: [
            "/",
            /\.(js|css|png)$/, // means "every JS, CSS, and PNG images"
          ],
        },
      },
    },
    {
      use: "gridsome-plugin-manifest",
      options: {
          background_color: "#000000",
          icon_path: "./src/favicon.png",
          name: "Orpington and Bromley PSFA",
          short_name: "OBPSFA",
          theme_color: "#FFFFFF",
          lang: "en",
      },
    }
  ],
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  }
}
