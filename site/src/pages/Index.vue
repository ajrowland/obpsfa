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
      <section class="news" :nostyle="'background-image:url(' + this.$page.home.edges[0].node.mainImage.asset.url + ')'">
        <div class="container">
          <H2>LATEST NEWS</h2>

          <div class="news__items">
            <a class="news__item" href="#" title="Clubs rally to our call!">
              <div class="news__item-text">
                <h3 class="news__item-title">Clubs rally to our call!</h3>
                <time>Sat Oct 19 2019</time>
                <p>A fantastic response from the footballing communitity, as clubs have kindly offered to help us provide district football next season.</p>
                <p class="news__item-more">Read more</p>
              </div>
              <g-image :src="this.$page.home.edges[0].node.mainImage.asset.url" width="400" height="175" />
            </a>

            <a class="news__item" href="#" title="A new home required">
              <div class="news__item-text">
                <h3 class="news__item-title">A new home required</h3>
                <time>Sat Oct 19 2019</time>
                <p>Over 20 years we have played at Orpington Rovers FC and there have been so many great memories, but unfortunately they have decided to part ways.</p>
                <p class="news__item-more">Read more</p>
              </div>
              <g-image :src="this.$page.home.edges[0].node.mainImage.asset.url" />
            </a>

            <a class="news__item" href="#" title="Kent Schools FA suspends all football">
              <div class="news__item-text">
                <h3 class="news__item-title">Kent Schools FA suspends all football</h3>
                <time>Sat Oct 19 2019</time>
                <p>Due to Coronavirus, Kent Schools FA has cancelled all schools football matches.</p>
                <p class="news__item-more">Read more</p>
              </div>
              <g-image :src="this.$page.home.edges[0].node.mainImage.asset.url" />
            </a>
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
  background-repeat: no-repeat;
  background-size: cover;
  padding: $vertical-spacing;
  margin-top: $vertical-spacing;
  color: #fff;

  h2 {
    font-size: 2.5rem;
  }

  &__items {
  }

  &__item {
    display: block;
    background-color: #666;
    margin: $gutter * 2 0;
    color: #fff;
    display: flex;
    text-decoration: none;
    transition: all .25s ease-in-out;
    text-rendering: optimizelegibility;

    &:hover {
      transform: scale(1.02);
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
    }

    h3 {
      background: $colour-red;

      &:before,
      &:after {
        background: $colour-red;
      }

      &:before {
        left: $gutter * -1;
      }

      padding-left: $gutter;
    }

    img {
      width: 45%;
      display: inline-block;
    }

    time {
      font-size: .8rem;
      display: block;
      margin: 0 $gutter;
    }

    p {
      margin: 20px;
    }

    &-more {
      font-weight: bold;

      /*&:after {
        content: "\25b6";
        margin-left: 4px;
        font-size: .8rem;
      }*/
    }
  }
}
</style>