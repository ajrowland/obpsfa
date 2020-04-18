<template>
  <Layout>

    <template v-if="$page.home.edges.length">
      <h1>{{$page.home.edges[0].node.title}}</h1>

      <extended-image
        :image="$page.home.edges[0].node.mainImage"
        width="800"
        height="400"
      />

      <portable-text
        :blocks="$page.home.edges[0].node._rawBody"
        :serializers="serializers"
      />
    </template>
    <template v-else>
      <h1>ERROR: No home page document exists.</h1>
    </template>

  </Layout>
</template>

<page-query>
query {
  home: allSanityHome {
    edges {
      node {
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
        seo {
          description
          author {
            name
          }
        }
      }
    }
  }
  metadata {
    siteName
    siteDescription
    siteUrl
    sanityOptions {
      projectId
      dataset
    }
  }
}
</page-query>

<script>
import fixtureList from '~/components/fixtureList'

export default {
  metaInfo() {
    return {
      title: this.$page.home.edges[0].node.title,
      meta: [
        {
          name: 'author',
          content: this.$page.home.edges[0].node.seo.author.name
        },
        {
          name: 'description',
          content: this.$page.home.edges[0].node.seo.description
        }
      ]
    }
  },
  data() {
    return {
      serializers: {
        types: {
          fixtureList: fixtureList
        },
        marks: {
          link: ({mark, children}) => {
            const {reference = {}, blank, href} = mark
            const url = reference.slug ? `/${reference.slug.current}` : href
            return blank ? <a href={url} target="blank" rel="noopener noreferer">{children}</a> : <a href={url}>{children}</a>
          }
        }
      }
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
