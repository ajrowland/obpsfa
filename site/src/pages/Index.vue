<template>
  <Layout>

    <h1>{{$page.home.title}}</h1>

    <extended-image
      :image="$page.home.mainImage"
      width="800"
      height="350"
      cssClass="main-image"
    />

    <extended-block
      :blocks="$page.home._rawBody"
    />

    <template slot="contentBottom">
      <section class="news" v-if="$page.news">
        <div class="container">
          <H2>Latest news</h2>

          <div class="news__items">
            <NewsItem v-for="newsItem in $page.news.edges" :key="newsItem.node.id" :item="newsItem.node" />
          </div>
        </div>
      </section>
    </template>

  </Layout>
</template>

<page-query>
query {
  home: sanityHome (id: "site-home") {
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
      image {
        asset {
          url
        }
      }
    }
  }
  news: allSanityPage(sortBy: "seo.publishedAt", order: DESC, filter: { sortOrder: {lt: 0} }) {
    edges {
      node {
        id
        title
        slug {
          current
        }
        _rawBody,
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
          publishedAt
        }
      }
    }
  }
  metadata {
    siteUrl,
    siteTwitterName
  }
}
</page-query>

<script>
import NewsItem from '~/components/NewsItem.vue'

export default {
  components: {
    NewsItem
  },
  metaInfo() {
    const page = this.$page.home
    const imageUrl = page.seo.image ? page.seo.image.asset.url : (page.mainImage ? page.mainImage.asset.url : '')

    return {
      title: 'Home',
      meta: [
        { name: 'author', content: page.seo.author.name },
        { name: 'description', content: page.seo.description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: page.seo.description },
        { name: 'twitter:title', content: 'Home' },
        { name: 'twitter:site', content: this.$page.metadata.siteTwitterName },
        { name: 'twitter:creator', content: this.$page.metadata.siteTwitterName },
        { name: 'twitter:image', content: imageUrl },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: 'Home' },
        { property: 'og:description', content: page.seo.description },
        { property: 'og:url', content: this.$page.metadata.siteUrl },
        { property: 'og:image', content: imageUrl }
      ]
    }
  }
}
</script>

<style lang="scss">
.news {
  background-image: linear-gradient(to bottom right, rgba($colour-red, 0.6), #fff);
  padding-top: $vertical-spacing;
  margin: $vertical-spacing * 2 0 $vertical-spacing * -1 0;
  color: #fff;

  h2 {
    text-transform: uppercase;
  }

  a.news__item:hover {
    transform: scale(1.02);
  }

  &__item {
    display: block;
    background-color: #666;
    color: #fff;
    text-decoration: none;
    transition: all .25s ease-in-out;
    margin: 0 -20px;

    @include mq($from: tablet) {
      display: flex;
      margin: $gutter * 2 0;
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
    }

    h3 {
      background: $colour-red;
      padding: $gutter;
      margin-top: 0;

      &:before,
      &:after {
        background: $colour-red;
      }

      &:before {
        left: $gutter * -1;
      }

      @include mq($from: tablet) {
        padding: 10px 20px;
      }
    }

    time {
      font-size: .8rem;
      display: block;
      margin: 0 $gutter;
    }

    p {
      margin: 20px;
    }

    img {
      display: block;
    }

    &-more {
      font-weight: bold;
    }
  }

  @include mq($from: tablet) {
    padding-bottom: $vertical-spacing;

    h2 {
      font-size: 2.5rem;
    }

    &__item-text {
      width: 55%;
    }

    &__image {
      width: 45%;
      background: #fff;
    }
  }
}
</style>