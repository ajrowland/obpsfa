<template>
  <Layout>
    <h1>{{ $page.home.title }}</h1>

    <extended-image
      :image="$page.home.mainImage"
      width="800"
      height="350"
      cssClass="main-image"
    />

    <extended-block :blocks="$page.home._rawBody" />

    <template slot="contentBottom">
      <section class="news" v-if="$page.news">
        <div class="container">
          <H2>Latest news</H2>

          <div class="news__items">
            <NewsItem
              v-for="newsItem in $page.news.edges"
              :key="newsItem.node.id"
              :item="newsItem.node"
              :url="newsItem.node.slug.current"
              :date="newsItem.node.date"
            />
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
      hotspot {
        x
        y
        height
        width
      }
      crop {
        top
        left
        right
        bottom
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
        hotspot {
          x
          y
          height
          width
        }
        crop {
          top
          left
          right
          bottom
        }
      }
    }
  }
  news: allSanityPage (
    sortBy: "date",
    order: DESC,
    filter: {
      sortOrder: {
        lt: 0
      },
      isArchived: {
        ne: true
      },
      isHidden: {
        ne: true
      }
    }
  ) {
    edges {
      node {
        id
        title
        date
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
          hotspot {
            x
            y
            height
            width
          }
          crop {
            top
            left
            right
            bottom
          }
        }
        seo {
          description
          authorDisplay
        }
      }
    }
  }
  metadata {
    siteUrl,
    siteTwitterName
    sanityOptions {
      projectId
      dataset
    }
  }
}
</page-query>

<script>
import NewsItem from "~/components/NewsItem.vue";

export default {
  components: {
    NewsItem,
  },
  metaInfo() {
    const page = this.$page.home;
    const image =
      page.seo.image && page.seo.image.asset
        ? page.seo.image
        : page.mainImage && page.mainImage.asset
        ? page.mainImage
        : null;

    const imageUrl =
      image !== null
        ? this.$urlForImage(image, this.$page.metadata.sanityOptions)
            .height(150)
            .width(280)
            .auto("format")
            .dpr(1)
            .url()
        : "";

    return {
      title: "Home",
      meta: [
        { name: "author", content: page.seo.author.name },
        { name: "description", content: page.seo.description },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: page.seo.description },
        { name: "twitter:title", content: "Home" },
        { name: "twitter:site", content: this.$page.metadata.siteTwitterName },
        {
          name: "twitter:creator",
          content: this.$page.metadata.siteTwitterName,
        },
        { name: "twitter:image", content: imageUrl },
        { property: "og:type", content: "article" },
        { property: "og:title", content: "Home" },
        { property: "og:description", content: page.seo.description },
        { property: "og:url", content: this.$page.metadata.siteUrl },
        { property: "og:image", content: imageUrl },
      ],
      link: [{ rel: "canonical", href: this.$page.metadata.siteUrl }],
    };
  },
};
</script>

<style lang="scss">
.news {
  background-image: linear-gradient(
    to bottom right,
    rgba($colour-red, 0.6),
    #fff
  );
  padding-top: $vertical-spacing;
  margin: $vertical-spacing * 2 0 $vertical-spacing * -1 0;
  color: #fff;

  h2 {
    text-transform: uppercase;
  }

  @include mq($from: tablet) {
    padding-bottom: $vertical-spacing;

    h2 {
      font-size: 2.5rem;
    }
  }
}
</style>
