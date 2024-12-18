<template>
  <iframe :title="title" :src="url" :width="width" :height="350" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
</template>

<script>
export default {
  props: ['title', 'url', 'height', 'width']
}
</script>
