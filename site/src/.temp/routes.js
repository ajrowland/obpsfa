export default [
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "C:\\Users\\andrew.rowland\\Documents\\Projects\\family\\obpsfa\\site\\node_modules\\gridsome\\app\\pages\\404.vue")
  },
  {
    path: "/:slug__current/",
    component: () => import(/* webpackChunkName: "page--src-templates-sanity-page-vue" */ "C:\\Users\\andrew.rowland\\Documents\\Projects\\family\\obpsfa\\site\\src\\templates\\SanityPage.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src-pages-index-vue" */ "C:\\Users\\andrew.rowland\\Documents\\Projects\\family\\obpsfa\\site\\src\\pages\\Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "C:\\Users\\andrew.rowland\\Documents\\Projects\\family\\obpsfa\\site\\node_modules\\gridsome\\app\\pages\\404.vue")
  }
]

