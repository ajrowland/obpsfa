<template>
  <Layout>

    <h1>{{$page.page.title}}</h1>

    <extended-image
      :image="$page.page.mainImage"
      width="800"
      height="400"
    />

    <portable-text
      :blocks="$page.page._rawBody"
      :serializers="serializers"
      :projectId="$page.metadata.sanityOptions.projectId"
      :dataset="$page.metadata.sanityOptions.dataset"
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
    sanityOptions {
      projectId
      dataset
    }
  }
}
</page-query>

<script>
import fixtureList from '~/components/fixtureList'

export default {
  metaInfo() {
    return {
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
    }
  },
  data() {
    return {
      serializers: {
        types: {
          fixtureList: fixtureList,
        },
        marks: {
          link: ({mark, children}) => {
            const {reference = {}, blank, href} = mark
            const url = reference.slug ? `/${reference.slug.current}` : href
            return blank ? <a href={url} target="blank" rel="noopener noreferer">{children}</a> : <a href={url}>{children}</a>
          }
        }
      }
    };
  }
}
</script>
