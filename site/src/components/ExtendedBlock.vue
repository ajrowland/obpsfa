<template>

  <portable-text
    :blocks="blocks"
    :serializers="serializers"
    :projectId="$static.metadata.sanityOptions.projectId"
    :dataset="$static.metadata.sanityOptions.dataset"
  />

</template>

<static-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
}
</static-query>

<script>
import PortableText from 'sanity-blocks-vue-component'
import ExtendedImage from '~/components/ExtendedImage'
import FixtureList from '~/components/FixtureList'

export default {
  props: ['blocks'],
  data() {
    return {
      serializers: {
        types: {
          fixtureList: FixtureList,
          extendedImage: ({node}) => {
            return <extended-image image={node} width="800" height="400" />
          }
        },
        marks: {
          link: ({mark, children}) => {
            const {reference = {}, blank, href} = mark
            const url = reference.slug ? `/${reference.slug.current}` : href
            return blank ? <a href={url} target="blank" rel="noopener noreferer">{children}</a> : <a href={url}>{children}</a>
          }
        }
      }
    }
  },
  components: {
    PortableText
  }
}
</script>
