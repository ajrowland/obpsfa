<template>
  <div class="layout">
    <header class="header">
      <div class="header__top-bar">
        <div class="container">
          <div class="header__top-links" @click="closeMenu">
            <g-link
              class="header__top-link"
              to="/covid-19-checklist"
              title="COVID-19 match day checklist"
              >COVID-19</g-link
            >
            <g-link class="header__top-link" to="/archive" title="Archive"
              >Archive</g-link
            >
            <a
              class="header__top-link"
              :href="`mailto:${$static.metadata.siteEmail}`"
              title="Send us an email"
              target="blank"
              rel="noopener noreferer"
              >Email</a
            >
            <a
              class="header__top-link"
              :href="`https://twitter.com/${$static.metadata.siteTwitterName}`"
              title="View our Twitter feed"
              target="blank"
              rel="noopener noreferer"
            >
              <svg viewBox="0 0 512 512">
                <path
                  d="M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="container">
        <nav class="header__nav">
          <div @click="closeMenu">
            <g-link to="/" class="header__logo" title="Home">Home</g-link>
          </div>

          <button class="header__menu-toggle" v-on:click="toggleMenu">
            Menu
          </button>

          <div class="header__nav-links" @click="closeMenu">
            <g-link class="header__nav-link" to="/">Home</g-link>
            <template v-for="edge in $static.pages.edges">
              <g-link
                class="header__nav-link"
                :to="edge.node.slug.current"
                :key="edge.node.id"
                :title="edge.node.title"
                >{{ edge.node.title }}</g-link
              >
            </template>
          </div>
        </nav>
      </div>
    </header>

    <main class="main">
      <slot name="contentTop" />
      <div class="container">
        <slot />
      </div>
      <slot name="contentBottom" />
    </main>

    <footer class="footer">
      <div class="container">
        ©{{ new Date().getFullYear() }} OBPSFA |
        <a
          href="/obpsfa-risk-asesssment-2020.docx"
          target="_blank"
          rel="noopener"
          >COVID-19 risk assessment document</a
        >
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  pages: allSanityPage (
    sortBy: "sortOrder",
    order: ASC,
    filter: {
      sortOrder: {
        gt: 0
      },
      isArchived: {
        ne: true
      }
    }
  ) {
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
    siteUrl
    siteTwitterName
    siteEmail
  }
}
</static-query>

<script>
export default {
  methods: {
    toggleMenu() {
      const bodyClasses = document.querySelector("body").classList;

      bodyClasses.contains("menu-active")
        ? bodyClasses.remove("menu-active")
        : bodyClasses.add("menu-active");
    },
    closeMenu() {
      document.querySelector("body").classList.remove("menu-active");
    },
  },
};
</script>

<style lang="scss">
.menu-active {
  main,
  footer {
    display: none;

    @include mq($from: desktop) {
      display: block;
    }
  }
}

.layout {
  display: flex;
  min-height: 100vh;
  min-width: 320px;
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
  z-index: 2;
  position: sticky;
  top: 0;
  margin-bottom: 10px;

  @include mq($from: tablet) {
    height: 150px;
  }

  @include mq($from: desktop) {
    position: static;
    margin: $vertical-spacing 0;
    height: auto;
  }

  &__top {
    &-bar {
      background-color: $colour-red;
      color: #fff;
      text-align: right;
      text-transform: uppercase;
      font-weight: bold;
    }

    &-links {
      display: flex;
      justify-content: flex-end;
    }

    &-link {
      display: flex;
      align-items: center;
      color: #fff;
      text-decoration: none;
      padding: 5px;
      font-size: 0.8rem;

      @include mq($from: desktop) {
        font-size: 1rem;
        padding: 10px;

        &:hover {
          background: darken($colour-red, 10%);
        }
      }

      svg {
        display: inline-block;
        width: 32px;
        height: 32px;
        fill: #fff;
      }
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
      padding: $vertical-spacing * 4 0;
    }

    @include mq($from: desktop) {
      display: block;
      padding: $vertical-spacing * 1.5 0;
    }
  }

  &__logo {
    background: url(~@/assets/images/logo.png);
    background-color: #fff;
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    background-size: cover;
    text-indent: -9999px;
    border: 5px solid #fff;
    border-radius: 110px;
    position: absolute;
    top: $vertical-spacing / 4.2;
    z-index: 2;

    @include mq($from: tablet) {
      width: 150px;
      height: 150px;
      border-radius: 78px;
      border-width: 6px;
    }

    @include mq($from: desktop) {
      width: 204px;
      height: 204px;
      border-radius: 120px;
      border-width: 8px;
      margin-left: $gutter * -1;
    }
  }

  &__menu-toggle {
    position: absolute;
    right: 10px;
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
      margin: 34px 10px;
    }

    @include mq($from: desktop) {
      display: none;
    }
  }

  &__nav-link {
    padding: 10px 0;
    text-transform: uppercase;
    text-decoration: none;
    color: $colour-grey;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    display: block;
    transition: border-color 0.2s ease-in-out;

    &.active--exact.active,
    &:hover {
      border-color: $colour-grey;
    }

    @include mq($from: desktop) {
      padding: 5px 0;
      margin: 10px;
      display: inline;
    }
  }
}

.main {
  flex-grow: 1;
  margin-bottom: 2rem;

  p {
    line-height: 2;

    a {
      background-color: rgba($colour-red, 0.2);
      color: #000;
      text-decoration: none;
      padding: 4px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.footer {
  background: $colour-grey;
  color: #fff;
  padding: $vertical-spacing 0;

  a {
    color: #fff;
  }

  @include mq($from: desktop) {
    padding: $vertical-spacing * 2 0;
  }
}
</style>
