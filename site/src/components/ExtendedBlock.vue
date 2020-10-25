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
import PortableText from "sanity-blocks-vue-component";
import ExtendedImage from "~/components/ExtendedImage";
import DataTable from "~/components/DataTable";
import FixtureList from "~/components/FixtureList";
import Iframe from "~/components/Iframe";
import Gallery from "~/components/Gallery";

export default {
  props: ["blocks"],
  data() {
    const h = this.$createElement;

    return {
      serializers: {
        types: {
          fixtureList: FixtureList,
          iframe: Iframe,
          gallery: Gallery,
          extendedImage: ({ node }) => {
            const cssClass =
              node.position === "left" || node.position === "right"
                ? `article-image article-image--${node.position}`
                : "main-image";
            const width =
              node.position === "left" || node.position === "right" ? 350 : 800;

            return (
              <extended-image
                cssClass={cssClass}
                image={node}
                width={width}
                height="350"
              />
            );
          },
          table: DataTable,
        },
        marks: {
          link: ({ mark, children }) => {
            const { reference = {}, blank, href } = mark;

            return reference.slug ? (
              <g-link to={`/${reference.slug.current}`}>{children}</g-link>
            ) : (
              <a
                href={href}
                target="${blank ? 'blank' : false}"
                rel="${blank ? 'noopener noreferer' : false}"
              >
                {children}
              </a>
            );
          },
        },
      },
    };
  },
  components: {
    PortableText,
  },
};
</script>
