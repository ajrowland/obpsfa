<template>
  <Layout>

    <h1>{{$page.home.edges[0].node.title}}</h1>

    <g-image
      alt="Cover image"
      v-if="$page.home.edges[0].node.mainImage"
      :src="$urlForImage($page.home.edges[0].node.mainImage, $page.metadata.sanityOptions).height(440).width(800).auto('format').url()"
    />

    <block-content
      :blocks="$page.home.edges[0].node._rawBody"
    />

  </Layout>
</template>

<page-query>
query {
  home: allSanityHome {
    edges {
      node {
        title
        _rawBody
        mainImage {
          asset {
            _id
            url
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
export default {
  metaInfo: {
    title: 'Home'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
