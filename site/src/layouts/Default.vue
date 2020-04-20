<template>
  <div class="layout">
    <header class="header">
      <div class="header__top-bar">
        <div class="container">
          &nbsp;
        </div>
      </div>
      <div class="container">
        <nav class="header__nav">
          <g-link to="/" class="header__logo" title="Home">Home</g-link>

          <button class="header__menu-toggle" v-on:click="toggleMenu">Menu</button>

          <div class="header__nav-links" @click="toggleMenu">
            <g-link class="header__nav-link" to="/">Home</g-link>
            <template v-for="edge in $static.pages.edges">
              <g-link class="header__nav-link" :to="edge.node.slug.current" :key="edge.node.id" :title="edge.node.title">{{edge.node.title}}</g-link>
            </template>
          </div>
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>

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

<script>
export default {
  methods: {
    toggleMenu () {
      const bodyClasses = document.querySelector('body').classList

      bodyClasses.contains('menu-active') ? bodyClasses.remove('menu-active') : bodyClasses.add('menu-active')
    }
  }
}
</script>

<style lang="scss">
body {
  margin:0;
  padding:0;
  line-height: 1.5;
}

body,
button {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
}

.menu-active {
  main,
  footer {
    display: none;

    @include mq($from: tablet) {
      display: block;
    }
  }
}

.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.container {
  max-width: 992px;
  margin: 0 auto;
  padding-left: $gutter;
  padding-right: $gutter;
}

.header {
  background: lighten($colour-blue, 10%);
  box-shadow: 0px 1px 2px 0px rgba(51, 51, 51, 0.75);
  height: 103px;
  z-index: 1;
  position: sticky;
  top: 0;

  @include mq($from: tablet) {
    position: static;
    margin: $vertical-spacing 0;
    height: auto;
  }

  &__top-bar {
    background-color: $colour-red;
    color: #fff;
    padding: 10px 0;
  }

  &__nav {
    @include mq($from: tablet) {
    }
  }

  &__nav-links {
    padding: $vertical-spacing * 3 0;
    text-align: right;
    display: none;

    .menu-active & {
      display: block;
    }

    @include mq($from: tablet) {
      display: block;
      padding: $vertical-spacing * 1.5 0;
    }
  }

  &__logo {
    background: url(~@/favicon.png);
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    background-size: cover;
    text-indent: -9999px;
    border: 5px solid #fff;
    border-radius: 110px;
    position: absolute;
    top: $vertical-spacing / 4.2;

    @include mq($from: tablet) {
      width: 200px;
      height: 200px;
      border-radius: 120px;
      border-width: 10px;
    }
  }

  &__menu-toggle {
    position: absolute;
    right: 0;
    text-transform: uppercase;
    background: $colour-blue;
    border: none;
    font-weight: bold;
    padding: 10px;
    margin: 10px;
    outline: 0;
    font-size: 1rem;

    &:after {
      content: "\2630";
      width: 20px;
      display: inline-block;
      text-align: right;
    }

    .menu-active &:after {
      content: "\2715";
    }

    @include mq($from: tablet) {
      display: none;
    }
  }

  &__nav-link {
    padding: 10px 0;
    text-transform: uppercase;
    text-decoration: none;
    color: $colour-grey;
    font-weight:bold;
    border-bottom: 2px solid transparent;
    display: block;
    transition: border-color .2s ease-in-out;

    &.active--exact.active,
    &:hover {
      border-color: $colour-grey;
    }

    @include mq($from: tablet) {
      padding: 5px 0;
      margin: 10px;
      display: inline;
    }
  }
}

.main {
  flex-grow: 1;

  p {
    line-height: 2;
  }

  a {
    background-color: rgba($colour-red, 0.2);
    color: #000;
    text-decoration: none;
    padding: 4px 10px;

    &:hover {
      text-decoration: underline;
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
  background: $colour-grey;
  color: #fff;
  padding: $vertical-spacing 0;
  margin-top: $vertical-spacing;
}
</style>
