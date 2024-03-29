<template>
  <div :class="cssClass" v-if="image && image.asset">
    <!--<img
      :srcset="srcset"
      :src="src"
      :alt="image.alt || alt"
      :class="cssClass && `${cssClass}__img`"
    />-->
    <g-image
      :src="
        $urlForImage(image, $static.metadata.sanityOptions)
          .height(height)
          .width(width)
          .auto('format')
          .dpr(1)
          .url()
      "
      :alt="image.alt || alt"
      :class="cssClass && `${cssClass}__img`"
      :width="width"
      :height="height"
      loading="lazy"
    />
    <div
      :class="cssClass && `${cssClass}__caption`"
      v-if="!hideCaption && image.caption"
    >
      <div :class="cssClass && `${cssClass}__caption-text`">
        {{ image.caption }}
      </div>
    </div>
    <div
      :class="cssClass && `${cssClass}__attribution`"
      v-if="image.attribution"
    >
      ©{{ image.attribution }}
    </div>
  </div>
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
export default {
  props: ["image", "width", "height", "cssClass", "alt", "hideCaption"],
  /*
  data() {
    return {
      widths: this.width.split(","),
      heights: this.height.split(","),
    };
  },
  computed: {
    srcset() {
      if (this.widths.length > 1) {
        let srcset = "";

        for (let i = 0; i < this.widths.length; i++) {
          srcset += `${this.$urlForImage(
            this.image,
            this.$static.metadata.sanityOptions
          )
            .height(this.heights[i])
            .width(this.widths[i])
            .auto("format")
            .dpr(1)
            .url()} ${this.widths[i]}w,`;
        }

        return srcset;
      }
    },
    src() {
      return this.$urlForImage(this.image, this.$static.metadata.sanityOptions)
        .height(this.heights[this.heights.length - 1])
        .width(this.widths[this.widths.length - 1])
        .auto("format")
        .dpr(1)
        .url();
    },
  },
  */
};
</script>

<style lang="scss">
.article-image {
  &--left,
  &--right {
    margin-bottom: $vertical-spacing;
  }

  &--left {
    @include mq($from: tablet) {
      float: left;
      margin-right: 20px;
      width: 45%;
    }
  }

  &--right {
    @include mq($from: tablet) {
      float: right;
      margin-left: 20px;
      width: 45%;
    }
  }
}

.main-image {
  position: relative;
  overflow: hidden;
  margin: $vertical-spacing $gutter * -1;
  font-size: 0.8rem;

  @include mq($from: tablet) {
    margin: $vertical-spacing 0;
    font-size: 1rem;
  }

  img {
    display: block;
    height: auto;
  }

  &__caption {
    background: $colour-red;
    padding: 5px $gutter;
    display: inline-block;
    max-width: 70%;

    @include mq($from: tablet) {
      position: absolute;
      top: 60%;
      right: -50px;
      padding-right: 50px;
      padding-left: $gutter * 2;
      max-width: 35%;
      transform: skew(-30deg);
    }

    &-text {
      padding: 5px 0;
      color: #fff;
      line-height: 1.5;

      @include mq($from: tablet) {
        padding: 10px 20px 10px 0;
        display: inline-block;
        text-transform: uppercase;
        line-height: 2rem;
        font-weight: bold;
        transform: skew(30deg);
      }
    }
  }

  &__attribution {
    padding: 5px $gutter;
    text-align: left;

    @include mq($from: tablet) {
      padding: 5px 0;
      font-size: 0.8rem;
    }
  }
}
</style>
