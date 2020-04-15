<template>
  <Layout>

    <h1>{{$page.page.title}}</h1>

    <g-image
      alt="Cover image"
      v-if="$page.page.mainImage"
      :src="$urlForImage($page.page.mainImage, $page.metadata.sanityOptions).height(440).width(800).auto('format').url()"
    />

    <portable-text
      :blocks="$page.page._rawBody"
      :serializers="serializers"
      :projectId="$page.metadata.sanityOptions.projectId"
      :dataset="$page.metadata.sanityOptions.dataset"
    />

  </Layout>
</template>

<page-query>
query Page ($id: ID!) {
  page: sanityPage (id: $id) {
    title
    _rawBody(resolveReferences: {maxDepth: 5})
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
import fixtureList from '~/components/fixtureList'

export default {
  metaInfo() {
    return {
      title: this.$page.page.title
    }
  },
  data() {
    return {
      serializers: {
        types: {
          fixtureList: fixtureList
        }
      }
    };
  }
}
</script>
