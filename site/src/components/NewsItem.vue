<template>
  <g-link :to="item.slug.current" :title="item.title" class="news__item">
    <div class="news__item-text">
      <h3 class="news__item-title" v-html="item.title" />
      <time v-html="formatDate(item.seo.publishedAt)" />
      <p>{{item.seo.description}}</p>
      <p class="news__item-more">Read more</p>
    </div>
    <extended-image
      :image="item.mainImage"
      width="800"
      height="600"
      cssClass="news__image"
      :hideCaption=true
    />
  </g-link>
</template>

<script>
export default {
  props: ['item']
}
</script>
