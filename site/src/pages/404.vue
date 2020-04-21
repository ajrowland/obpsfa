<template>
  <Layout>

    <h1>Page not found</h1>

    <div class="main-image">
      <g-image
        src="~/assets/images/404.jpg"
        alt="Photo of Chris Kamara"
        class="main-image__img"
        width="800"
        height="350"
      />
      <div class="main-image__caption">
        <div class="main-image__caption-text">
          Unbelievable Jeff!
        </div>
      </div>
    </div>

    <p>Sorry, it looks like that page doesn't exists.  Please select another from the menu.</p>

  </Layout>
</template>

<page-query>
query {
  metadata {
    siteName
    siteDescription
    siteUrl
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: 'Page not found',
      meta: [
        {
          name: 'description',
          content: 'Page not found'
        }
      ]
    }
  }
}
</script>

