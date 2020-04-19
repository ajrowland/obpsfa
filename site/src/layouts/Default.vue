<template>
  <div class="layout">
    <header class="header">
      <div class="header__top-bar">
        <div class="container">
          social links
        </div>
      </div>
      <div class="container">
        <nav class="header__nav">
          <g-link to="/" class="header__logo" title="Home">Home</g-link>

          <div class="header__nav-links">
            <g-link class="header__nav-link" to="/">Home</g-link>
            <template v-for="edge in $static.pages.edges">
              <g-link class="header__nav-link" :to="edge.node.slug.current" :key="edge.node.id" :title="edge.node.title">{{edge.node.title}}</g-link>
            </template>
          </div>
        </nav>
      </div>
    </header>

    <div class="container">
      <slot />
    </div>

    <footer class="footer">
      <div class="container">
        ©{{ new Date().getFullYear() }} OBPSFA
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  pages: allSanityPage(sortBy: "sortOrder", order: ASC) {
    edges {
      node {
        id
        sortOrder,
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

.container {
  max-width: 760px;
  margin: 0 auto;
  padding-left: $gutter;
  padding-right: $gutter;
}

.header {
  margin-bottom: 20px;

  &__top-bar {
    background-color: $colour-red;
    color: #fff;
    padding: 10px 0;
    margin-bottom: $vertical-spacing;
  }

  &__nav {
    display: flex;
    justify-content: space-between;

    @include mq($from: tablet) {
      align-items: center;
    }
  }

  &__nav-links {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @include mq($from: tablet) {
      margin-left: 20px;
      flex-direction: row;
    }
  }

  &__logo {
    background: url(~@/favicon.png);
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    background-size: cover;
    text-indent: -9999px;
  }

  &__nav-link {
    padding: 10px 0;
    text-align: right;

    @include mq($from: tablet) {
      padding: 0;
      margin-left: 20px;
    }
  }
}

img {
  width: 100%;
}

figure {
  margin: 0;
}

.footer {
  background: #333;
  color: #fff;
  padding: $vertical-spacing 0;
  margin-top: $vertical-spacing;
}
</style>
