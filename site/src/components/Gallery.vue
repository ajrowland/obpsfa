<template>
  <div class="gallery">
    <h1>{{title}}</h1>
    <div class="gallery__main-container">
      <transition-group v-if="images.length" name='fade' tag='div' class="gallery__image-container">
        <div v-for="number in [currentNumber]" :key='number' class="gallery__image">
          <g-image :src="currentImage.link" />
        </div>
      </transition-group>
      <div class="gallery__controls" v-if="images.length">
        <a class="gallery__prev" @click="prev" title="Previous image"><span class="gallery__label">Previous</span></a>
        <a class="gallery__next" @click="next" title="Next image"><span class="gallery__label">Next</span></a>
      </div>
    </div>
    <div class="gallery__thumbnail-container">
      <div v-for="(thumbnail, i) in images" :key="i" class="gallery__thumbnail" @click="goto(i)">
        <g-image :src="thumbnail.link" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.gallery {
  &__controls {
    position: absolute;
    top: 50%;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  &__prev,
  &__next {
    background: $colour-red;
    cursor: pointer;
    transform: skew(-30deg);
    padding: 0 30px;
    margin-left: -20px;
  }

  &__next {
    left: auto;
    margin-left: 0;
    margin-right: -20px;
  }

  &__label {
    color: #fff;
    font-size: .8rem;
    font-weight: bold;
    transform: skew(30deg);
    display: block;
    padding: 10px;
    display: inline-block;
    text-transform: uppercase;
    line-height: 2rem;
    font-weight: bold;
  }

  &__main-container {
    position: relative;
    overflow: hidden;
  }

  &__image-container {
    position: relative;
    padding-top: 65%;
    height: 0;
    overflow: hidden;
  }

  &__thumbnail-container {
    display: flex;
    flex-wrap: wrap;
    margin: 2px -1px;
  }

  &__thumbnail {
    width: 20%;
    margin: 0 1px;
    cursor: pointer;
    flex-basis: 7%;
  }

  &__image {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.8s ease;
    overflow: hidden;
    visibility: visible;
    opacity: 1;
    position: absolute;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    visibility: hidden;
    top: 0;
  }
}
</style>

<script>
import axios from 'axios'

export default {
  props: ['imgurId'],
  data() {
    return {
      title: '',
      images: [],
      currentNumber: 0
    }
  },
  created() {
    this.getImages()
  },
  computed: {
    currentImage() {
      return this.images && this.images[Math.abs(this.currentNumber) % this.images.length];
    }
  },
  methods: {
    getImages() {
      let component = this

      axios.get(`https://api.imgur.com/3/album/${this.imgurId}`, {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
        }
      }).then(response => {
        component.title = response.data.data.title,
        component.images = response.data.data.images;
      })
      .catch(error => {
        console.log(error)
      });
    },
    prev() {
      this.currentNumber -= 1
    },
    next() {
      this.currentNumber += 1
    },
    goto(i) {
      this.currentNumber = i
    }
  }
}
</script>