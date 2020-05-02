<template>
  <Layout>

    <h1>{{$context.title}}</h1>

    <div class="blog__date">{{formatDate($context.date)}}, by {{$context.seo.authorDisplay || $context.seo.author.name}}</div>

    <extended-image
      :image="$context.mainImage"
      width="800"
      height="350"
      cssClass="main-image"
    />

    <extended-block
      :blocks="$context._rawBody"
    />

  </Layout>
</template>

<script>
export default {
  metaInfo() {
    const page = this.$context
    const imageUrl = page.seo.image ? page.seo.image.asset.url : (page.mainImage ? page.mainImage.asset.url : '')

    return {
      title: page.title,
      meta: [
        { name: 'author', content: page.seo.authorDisplay || page.seo.author.name },
        { name: 'description', content: page.seo.description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: page.seo.description },
        { name: 'twitter:title', content: page.title },
        { name: 'twitter:site', content: page.metadata.siteTwitterName },
        { name: 'twitter:creator', content: page.metadata.siteTwitterName },
        { name: 'twitter:image', content: imageUrl },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.seo.description },
        { property: 'og:url', content: `${page.metadata.siteUrl}/${page.path}` },
        { property: 'og:image', content: imageUrl }
      ]
    }
  }
}
</script>
