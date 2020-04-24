<template>
  <Layout>

    <template v-if="$page.home.edges.length">
      <h1>{{$page.home.edges[0].node.title}}</h1>

      <extended-image
        :image="$page.home.edges[0].node.mainImage"
        width="800"
        height="350"
        cssClass="main-image"
      />

      <extended-block
        :blocks="$page.home.edges[0].node._rawBody"
      />
    </template>
    <template v-else>
      <h1>ERROR: No home page document exists.</h1>
    </template>
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
  news: allSanityPage(sortBy: "seo.publishedAt", order: DESC, filter: { sortOrder: {lt: 0} }) {
    edges {
      node {
        id
        title
        slug {
          current
        }
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
    siteName
    siteDescription
    siteUrl
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

<style lang="scss">
.news {
  background-image: linear-gradient(to bottom right, rgba($colour-red, 0.6), #fff);
  padding-top: $vertical-spacing;
  margin-top: $vertical-spacing * 2;
  color: #fff;

  h2 {
    text-transform: uppercase;
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

    &:hover {
      transform: scale(1.02);
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
    }
  }
}
</style>