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
    slug {
      current
    }
    seo {
      description
      author {
        name
      }
      image {
        asset {
          url
        }
      }
    }
  }
  metadata {
    siteTwitterName
    siteUrl
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    const page = this.$page.page
    const imageUrl = page.seo.image ? page.seo.image.asset.url : (page.mainImage ? page.mainImage.asset.url : '')

    return {
      title: page.title,
      meta: [
        { name: 'author', content: page.seo.author.name },
        { name: 'description', content: page.seo.description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: page.seo.description },
        { name: 'twitter:title', content: page.title },
        { name: 'twitter:site', content: this.$page.metadata.siteTwitterName },
        { name: 'twitter:creator', content: this.$page.metadata.siteTwitterName },
        { name: 'twitter:image', content: imageUrl },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.seo.description },
        { property: 'og:url', content: `${this.$page.metadata.siteUrl}/${page.slug.current}` },
        { property: 'og:image', content: imageUrl }
      ]
    }
  }
}
</script>
