<template>
  <Layout>

    <h1>{{$page.page.title}}</h1>

    <g-image
      alt="Cover image"
      v-if="$page.page.mainImage"
      :src="$urlForImage($page.page.mainImage, $page.metadata.sanityOptions).height(440).width(800).auto('format').url()"
    />

    <block-content
      :blocks="$page.page._rawBody"
    />

  </Layout>
</template>

<page-query>
query Page ($id: ID!) {
  page: sanityPage (id: $id) {
    title
    _rawBody
    mainImage {
      asset {
        _id
        url
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
  metaInfo() {
    return {
      title: this.$page.page.title
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
