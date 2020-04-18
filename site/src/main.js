// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import ExtendedImage from '~/components/ExtendedImage.vue'
import ExtendedBlock from '~/components/ExtendedBlock.vue'
import urlBuilder from '@sanity/image-url'

const urlForImage = (source, data) => {
  const isBrowser = typeof window !== 'undefined'
  const { projectId, dataset } = data
  const builder = urlBuilder({ projectId, dataset }).image(source)
  const dpr = isBrowser ? Math.min(Math.ceil(window.devicePixelRatio || 1), 3) : 1
  return dpr > 1 ? builder.dpr(dpr) : builder
}

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('ExtendedImage', ExtendedImage)
  Vue.component('ExtendedBlock', ExtendedBlock)

  // Inject global image URL builder
  Vue.prototype.$urlForImage = urlForImage
}
