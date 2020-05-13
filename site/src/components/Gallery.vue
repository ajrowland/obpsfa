<template>
  <div class="gallery" v-if="images.length">
    <h2 v-if="showTitle && title">{{title}}</h2>
    <div class="gallery__main-container" v-if="images.length" v-touch:swipe="this.swipe">
      <transition-group name='fade' tag='div' class="gallery__image-container" v-bind:style="{ paddingTop: aspectRatio + '%' }">
        <div v-for="number in [currentNumber]" :key='number' class="gallery__image">
          <video v-if="currentImage.isVideo" muted controls playsInline>
            <source :src="currentImage.link" :type="currentImage.type">
          </video>
          <g-image v-else :src="currentImage.link" :alt="`Gallery image ${currentNumber + 1} of ${images.length}`" />
        </div>
      </transition-group>
      <div class="gallery__controls">
        <a class="gallery__prev" @click="prev" title="Previous image"><span class="gallery__label">Previous</span></a>
        <a class="gallery__next" @click="next" title="Next image"><span class="gallery__label">Next</span></a>
      </div>
    </div>
    <div class="gallery__thumbnail-container">
      <div v-for="(thumbnail, i) in images" :key="i" class="gallery__thumbnail" @click="goto(i)" :class="currentNumber === i && 'active'">
        <div v-if="thumbnail.isVideo" class="gallery__thumbnail-video">Video</div>
        <g-image v-else :src="thumbnail.thumbnail" :alt="`Gallery thumbnail ${currentNumber + 1} of ${images.length}`" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.gallery {
  margin: $vertical-spacing 0;

  &__main-container {
    position: relative;
    overflow: hidden;
  }

  &__image-container {
    position: relative;
    height: 0;
    overflow: hidden;
  }

  &__thumbnail-container {
    display: flex;
    flex-wrap: wrap;
    margin: 1px -1px;
  }

  &__thumbnail {
    width: calc(10% - 2px);
    margin: 1px;
    cursor: pointer;
    opacity: .4;
    display: flex;
    flex-direction: column;

    &.active {
      opacity: 1;
    }

    @include mq($from: tablet) {
      width: calc(5% - 2px);
    }

    img {
      display: inline-block;
    }

    &-video {
      background: $colour-red;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }

  &__image {
    position: absolute;
    top: 0;
    width: 100%;

    video {
      width: 100%;
    }
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

  &__controls {
    @include mq($from: tablet) {
      position: absolute;
      display: flex;
      width: 100%;
      top: 50%;
      justify-content: space-between;
    }
  }

  &__prev,
  &__next {
    width: 20%;
    height: 100%;
    position: absolute;
    top: 0;

    @include mq($from: tablet) {
      background: $colour-red;
      cursor: pointer;
      transform: skew(-30deg);
      padding: 0 30px;
      margin-left: -20px;
      width: auto;
      height: auto;
    }
  }

  &__next {
    left: auto;
    right: 0;

    @include mq($from: tablet) {
      margin-left: 0;
      margin-right: -20px;
    }
  }

  &__label {
    display: none;

    @include mq($from: tablet) {
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
  }
}
</style>

<script>
import axios from 'axios'

export default {
  props: {
    imgurId: {
      type: String
    },
    showTitle: {
      default: false,
      type: Boolean
    },
    minHeight: {
      default: 640,
      type: Number
    },
    aspectRatio: {
      default: 66.66,
      type: Number
    }
  },
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
    async getImages() {
      try {
        const response = await axios.get(`https://api.imgur.com/3/album/${this.imgurId}`, {
          headers: {
            Authorization: `Client-ID ${process.env.GRIDSOME_IMGUR_CLIENT_ID}`
          }
        })

        this.title = response.data.data.title,
        this.images = response.data.data.images.filter(image => {
          const aspectRatio = image.height / image.width * 100

          console.log(image)
          image.isVideo = image.type.indexOf('video') != -1

          if (image.isVideo || (image.height >= this.minHeight && aspectRatio >= this.aspectRatio - 1 && aspectRatio <= this.aspectRatio + 1)) {
            if (!image.isVideo) {
              image.thumbnail = image.link.substr(0, image.link.lastIndexOf('.')) + 's' + image.link.substr(image.link.lastIndexOf('.'))
            }

            return image
          }
        })
      } catch(err) {
        console.log(err)
      }
    },
    prev() {
      this.currentNumber -= 1
      if (this.currentNumber < 0) this.currentNumber = this.images.length - 1;
    },
    next() {
      this.currentNumber += 1
      if (this.currentNumber >= this.images.length) this.currentNumber = 0;
    },
    goto(i) {
      this.currentNumber = i
    },
    swipe(direction) {
      if (direction === 'left') this.next();
      if (direction === 'right') this.prev();
    }
  }
}
</script>