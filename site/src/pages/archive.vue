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
      <a name="articles"></a>
      <section class="archive">
        <div class="container">
          <Pager :info="$page.archive.pageInfo" anchor="articles" class="pager" />

          <div class="news__items">
            <NewsItem v-for="page in $page.archive.edges"
              :key="page.node.id"
              :item="page.node"
              :url="page.node.path"
              :date="page.node.date"
            />
          </div>

          <Pager :info="$page.archive.pageInfo" anchor="articles" class="pager" />
        </div>
      </section>
    </template>

  </Layout>
</template>

<page-query>
query ($page: Int) {
  home: sanityArchive (id: "cfb9a604-be08-4616-a0c5-84e686b3be88") {
    title
    path
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
  archive: allSanityPage (
    sortBy: "date"
    order: DESC
    perPage: 5
    page: $page
    filter: {
      isArchived: {
        eq: true
      }
    }
  ) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        path
        id
        title
        date
        mainImage {
          alt
          caption
          attribution
          asset {
            _id
            url
          }
        }
        _rawBody(resolveReferences: {maxDepth: 5})
        seo {
          author {
            name
          }
          authorDisplay
          description
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
import { Pager } from 'gridsome'
import NewsItem from '~/components/NewsItem.vue'

export default {
  components: {
    Pager,
    NewsItem
  },
  metaInfo() {
    const page = this.$page.home
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
        { property: 'og:url', content: `${this.$page.metadata.siteUrl}${page.path}` },
        { property: 'og:image', content: imageUrl }
      ],
      link: [
        { rel: 'canonical', href: `${this.$page.metadata.siteUrl}${page.path}` }
      ]
    }
  }
}
</script>

<style lang="scss">
.archive {
  background-image: linear-gradient(to bottom right, rgba($colour-red, 0.6), #fff);
  padding: $vertical-spacing 0;
  margin: $vertical-spacing*2 0 $vertical-spacing*-1 0;
  color: #fff;

  &__entry {
    border-bottom: 1px solid #eee;
  }

  &__title {
    margin-bottom: 4px;
  }

  &__date {
    font-size: .8rem;
    font-style: italic;
  }
}

.pager {
  display: flex;
  justify-content: center;
  padding: 2rem;
  margin: $vertical-spacing 0;

  @include mq($from: tablet) {
    justify-content: flex-end;
    padding: 0;
  }

  a {
    display: inline-block;
    padding: 5px 10px;
    background: $colour-red;
    color: #fff;
    transition: all .25s ease-in-out;
    margin: 0 1px;
    text-decoration: none;

    &.active,
    &:hover {
      background: #000;
    }
  }
}
</style>
