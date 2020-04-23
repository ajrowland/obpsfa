<template>

  <div :class="cssClass" v-if="image">
    <g-image
      :src="$urlForImage(image, $static.metadata.sanityOptions).height(height).width(width).auto('format').url()"
      :alt="image.alt || alt"
      :class="cssClass && `${cssClass}__img`"
    />
    <div :class="cssClass && `${cssClass}__caption`" v-if="!hideCaption && image.caption">
      <div :class="cssClass && `${cssClass}__caption-text`">
       {{image.caption}}
      </div>
    </div>
    <div :class="cssClass && `${cssClass}__attribution`" v-if="image.attribution">
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
  props: ['image', 'width', 'height', 'cssClass', 'alt', 'hideCaption']
}
</script>

<style lang="scss">
.main-image {
  position: relative;
  overflow: hidden;
  margin: $vertical-spacing $gutter * -1;
  font-size: .8rem;

  @include mq($from: tablet) {
    margin: $vertical-spacing 0;
    font-size: 1rem;
  }

  img {
    display: block;
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
      font-size: .8rem;
    }
  }
}
</style>