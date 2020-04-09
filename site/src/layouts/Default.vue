<template>
  <div class="layout">
    <header class="header">
      <g-link to="/" class="header__logo" title="Home">Home</g-link>

      <nav class="nav">
        <template v-for="edge in $static.pages.edges">
          <g-link class="nav__link" :to="edge.node.slug.current" :key="edge.node.id" :title="edge.node.title">{{edge.node.title}}</g-link>
        </template>
        <g-link class="nav__link" to="/fixtures" title="Fixtures">Fixtures</g-link>
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
  margin: 20px 0;
  display: flex;
  justify-content: space-between;

  @include mq($from: tablet) {
    height: 140px;
    align-items: center;
  }

  &__logo {
    background: url(~@/favicon.png);
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    display: inline-block;
    background-size: cover;
    text-indent: -9999px;
  }
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @include mq($from: tablet) {
    margin-left: 20px;
    flex-direction: row;
  }
}

.nav__link {
  @include mq($from: tablet) {
    margin-left: 20px;
  }
}

img {
  width: 100%;
}
</style>
