<template>

  <div class="extended-image" v-if="image">
    <g-image
      :src="$urlForImage(image, $static.metadata.sanityOptions).height(height).width(width).auto('format').url()"
      :alt="image.alt || alt"
      :class="cssClass"
    />
    <div class="extended-image__caption" v-if="image.caption">
      <div class="extended-image__caption-text">
       {{image.caption}}
      </div>
    </div>
    <div class="extended-image__attribution" v-if="image.attribution">
      ©{{image.attribution}}
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
  props: ['image', 'width', 'height', 'cssClass', 'alt']
}
</script>

<style lang="scss">
.extended-image {
  position: relative;
  overflow: hidden;
  margin: $vertical-spacing 0;

  img {
    display: block;
  }

  &__caption {
    display: inline-block;
    right: 0;
    background: $colour-red;

    @include mq($from: tablet) {
      position: absolute;
      top: 60%;
      right: -50px;
      padding-right: 50px;
      transform: skew(-30deg);
      padding-left: $gutter * 2;
      max-width: 35%;
    }

    &-text {
      padding: 5px 10px;
      color: #fff;
      line-height: 1;

      @include mq($from: tablet) {
        padding: 10px 20px 10px 0;
        display: inline-block;
        transform: skew(30deg);
        text-transform: uppercase;
        line-height: 2rem;
        font-weight: bold;
      }
    }
  }

  &__attribution {
    font-size: 0.8rem;
    position: absolute;
    display: inline-block;
    padding: 4px;
    top: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.9);

    @include mq($from: tablet) {
      position: static;
      display: block;
      background: none;
      padding: 4px 0;
      text-align: right;
    }
  }
}
</style>