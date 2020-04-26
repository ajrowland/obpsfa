<template>
  <Layout>

    <template v-if="this.$page.page">
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
    </template>
    <template v-else>
      <h1>Page not found</h1>

      <div class="main-image">
        <g-image
          src="~/assets/images/404.jpg"
          alt="Photo of Chris Kamara"
          class="main-image__img"
          width="800"
          height="350"
        />
        <div class="main-image__caption">
          <div class="main-image__caption-text">
            Unbelievable Jeff!
          </div>
        </div>
      </div>

      <p>Sorry, it looks like that page doesn't exists.  Please select another from the menu.</p>
    </template>

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

    return page ? {
      title: 'Home',
      meta: [
        { name: 'author', content: page.seo.author.name },
        { name: 'description', content: page.seo.description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: page.seo.description },
        { name: 'twitter:title', content: page.title },
        { name: 'twitter:site', content: this.$page.metadata.siteTwitterName },
        { name: 'twitter:creator', content: this.$page.metadata.siteTwitterName },
        { name: 'twitter:image', content: page.mainImage.asset.url },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.seo.description },
        { property: 'og:url', content: `${this.$page.metadata.siteUrl}/${page.slug.current}` },
        { property: 'og:image', content: page.mainImage.asset.url }
      ]
    } : {
      title: 'Page not found',
      meta: [
        {
          name: 'author',
          content: 'OBPSFA'
        },
        {
          name: 'description',
          content: 'Page not found'
        }
      ]
    }
  }
}
</script>
