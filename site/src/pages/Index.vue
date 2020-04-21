<template>
  <Layout>

    <template v-if="$page.home.edges.length">
      <h1>{{$page.home.edges[0].node.title}}</h1>

      <extended-image
        :image="$page.home.edges[0].node.mainImage"
        width="800"
        height="400"
        cssClass="main-image"
      />

      <extended-block
        :blocks="$page.home.edges[0].node._rawBody"
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
  }
}
</page-query>

<script>
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
  }
}
</script>
