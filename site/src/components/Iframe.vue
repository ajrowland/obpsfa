<template>
  <iframe :src="url" :width="width" :height="350" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
</template>

<script>
export default {
  props: ['url', 'height', 'width']
}
</script>
