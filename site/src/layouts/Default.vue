<template>
  <div class="layout">
    <header class="header">
      <g-link to="/" class="header__logo" title="Home">Home</g-link>

      <nav class="nav">
        <template v-for="edge in $static.pages.edges">
          <g-link class="nav__link" :to="edge.node.slug.current" :key="edge.node.id" :title="edge.node.title">{{edge.node.title}}</g-link>
        </template>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  pages: allSanityPage {
    edges {
      node {
        id
        title
        slug {
          current
        }
      }
    }
  }
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 140px;

  &__logo {
    background: url(~@/assets/images/logo.jpg);
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    display: inline-block;
    background-size: cover;
    text-indent: -9999px;
  }
}

.nav__link {
  margin-left: 20px;
}

img {
  width: 100%;
}
</style>
