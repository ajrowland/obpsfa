<template>

  <div class="extended-image" v-if="image">
    <g-image
      :src="$urlForImage(image, $static.metadata.sanityOptions).height(height).width(width).auto('format').url()"
      :alt="image.alt || alt"
      :class="cssClass"
    />
    <div class="extended-image__caption" v-if="image.caption">
      {{image.caption}}
    </div>
    <div class="extended-image__attribution" v-if="image.attribution" v-html="image.attribution" />
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
  props: ['image', 'width', 'height', 'cssClass', 'alt']
}
</script>

<style lang="scss">
.extended-image {
  position: relative;

  img {
    display: block;
  }

  &__caption {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 5px 10px;
    font-size: 0.8rem;

    @include mq($from: tablet) {
      left: auto;
      font-size: 1rem;
      padding: 10px 20px;
    }
  }

  &__attribution {
    font-size: 0.8rem;
    padding: 4px 0;
  }
}
</style>