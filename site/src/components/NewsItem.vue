<template>

  <component :is="item._rawBody ? 'g-link' : 'div'" :to="item._rawBody && item.slug.current" :title="item._rawBody && item.title" class="news__item">
    <div class="news__item-text">
      <h3 class="news__item-title" v-html="item.title" />
      <time v-html="formatDate(item.seo.publishedAt)" />
      <p>{{item.seo.description}}</p>
      <p v-if="item._rawBody" class="news__item-more">Read more</p>
    </div>
    <extended-image
      :image="item.mainImage"
      width="400"
      height="300"
      cssClass="news__image"
      :hideCaption=true
    />
  </component>
</template>

<script>
export default {
  props: ['item']
}
</script>
