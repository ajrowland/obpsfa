<template>
  <Layout>

    <h1>{{$page.page.title}}</h1>

    <extended-image
      :image="$page.page.mainImage"
      width="800"
      height="350"
      cssClass="main-image"
    />

    <extended-block
      :blocks="$page.page._rawBody"
    />

  </Layout>
</template>

<page-query>
query Page ($id: ID!) {
  page: sanityPage (id: $id) {
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
      title: this.$page.page.title,
      meta: [
        {
          name: 'author',
          content: this.$page.page.seo.author.name
        },
        {
          name: 'description',
          content: this.$page.page.seo.description
        }
      ]
    }
  }
}
</script>
