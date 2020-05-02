<template>

  <component :is="item._rawBody ? 'g-link' : 'div'" :to="item._rawBody && url" :title="item._rawBody && item.title" class="news-item">
    <div class="news-item__text">
      <h3 class="news-item__title" v-html="item.title" />
      <time v-html="formatDate(date)" />
      <p>{{item.seo.description}}</p>
      <p v-if="item._rawBody" class="news-item__more">Read more</p>
    </div>
    <extended-image
      :image="item.mainImage"
      width="400"
      height="300"
      cssClass="news-item__image"
      :hideCaption=true
    />
  </component>
</template>

<script>
export default {
  props: ['item','url','date']
}
</script>

<style lang="scss">
a.news-item:hover {
  transform: scale(1.02);
}

.news-item {
  display: block;
  background-color: #666;
  color: #fff;
  text-decoration: none;
  transition: all .25s ease-in-out;
  margin: 0 -20px;

  &:nth-child(even) {
    flex-direction: row-reverse;
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

  time {
    font-size: .8rem;
    display: block;
    margin: 0 $gutter;
  }

  p {
    margin: 20px;
  }

  img {
    display: block;
  }

  &__more {
    font-weight: bold;
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
    }
  }
}
</style>
