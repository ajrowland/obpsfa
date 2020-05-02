<template>
  <Layout>

    <h1>Archive: The District diary</h1>

    <p>We are currently rebuilding our site. This section inparticular requires some work to add additional content and photos.</p>
    <p>If you have any content you would like to share, please send to: <a href="mailto:mail@obpsfa.com" title="Contact us">mail@obpsfa.com</a></p>

    <template slot="contentBottom">
      <section class="blog">
        <div class="container">
          <h2>Articles</h2>

          <Pager :info="$page.archive.pageInfo" class="pager" />

          <div class="news__items">
            <NewsItem v-for="page in $page.archive.edges"
              :key="page.node.id"
              :item="page.node"
              :url="page.node.path"
              :date="page.node.date"
            />
          </div>

          <Pager :info="$page.archive.pageInfo" class="pager" />
        </div>
      </section>
    </template>

  </Layout>
</template>

<page-query>
query ($page: Int) {
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
    const page = this.$page.archive
    const imageUrl = ''

    return {
      title: page.title,
      meta: [
        { name: 'author', content: 'OBPSFA' },
        { name: 'description', content: 'OBPSFA archive.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: 'OBPSFA archive.' },
        { name: 'twitter:title', content: page.title },
        { name: 'twitter:site', content: this.$page.metadata.siteTwitterName },
        { name: 'twitter:creator', content: this.$page.metadata.siteTwitterName },
        { name: 'twitter:image', content: imageUrl },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: 'OBPSFA archive.' },
        { property: 'og:url', content: `${this.$page.metadata.siteUrl}/archive` },
        { property: 'og:image', content: imageUrl }
      ]
    }
  }
}
</script>

<style lang="scss">
.blog {
  background-image: linear-gradient(to bottom right, rgba($colour-red, 0.6), #fff);
  padding-top: $vertical-spacing;
  margin: $vertical-spacing * 2 0 $vertical-spacing * -1 0;
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
  justify-content: flex-end;

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
