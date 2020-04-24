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
    return this.$page.page ?
      {
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
