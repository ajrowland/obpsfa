<template>
  <component
    :is="item._rawBody ? 'g-link' : 'div'"
    :to="item._rawBody && url"
    :title="item._rawBody && item.title"
    class="news-item"
  >
    <div class="news-item__text">
      <h3 class="news-item__title" v-html="item.title" />
      <div class="news-item__date">
        <time v-html="formatDate(date)" />
        <template v-if="item.seo.authorDisplay">, by {{ item.seo.authorDisplay }}</template>
      </div>
      <p>{{ item.seo.description }}</p>
      <p v-if="item._rawBody" class="news-item__more">Read more</p>
    </div>
    <extended-image
      :image="item.seo.image || item.mainImage"
      width="400"
      height="300"
      cssClass="news-item__image"
      :hideCaption="true"
      :alt="item.seo.description || item.mainImage.alt"
    />
  </component>
</template>

<script>
export default {
  props: ["item", "url", "date"],
};
</script>

<style lang="scss">
@include mq($from: tablet) {
  a.news-item:hover {
    transform: scale(1.02);
  }
}

.news-item {
  display: block;
  background-color: #666;
  color: #fff;
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  margin: 0 $gutter * -1;
  overflow: hidden;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  &__date {
    font-size: 0.8rem;
    display: block;
    margin: 0 $gutter;
  }

  h3 {
    background: $colour-red;
    padding: $gutter;
    margin-top: 0;

    &:before,
    &:after {
      background: $colour-red;
    }

    &:before {
      left: $gutter * -1;
    }

    @include mq($from: tablet) {
      padding: 10px 20px;
    }
  }

  p {
    margin: 20px;
  }

  img {
    display: block;
    height: auto;
  }

  &__more {
    font-weight: bold;
  }

  &__image {
    position: relative;
  }

  &__image__attribution {
    display: inline-block;
    background: #fff;
    color: $colour-grey;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 5px $gutter;
  }

  @include mq($from: tablet) {
    display: flex;
    margin: $gutter * 2 0;
    background: #fff;

    &__text {
      width: 55%;
      background: #666;
    }

    &__image {
      width: 45%;
      background: #fff;

      img {
        height: 100%;
        object-fit: cover;
      }
    }

    &__image__attribution {
      right: auto;
    }
  }
}
</style>
