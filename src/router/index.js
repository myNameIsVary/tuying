import Vue from "vue";
import VueRouter from "vue-router";

// 组件注册
import Index from "../components/Index.vue"; /* 主页 */

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    mata: {
      title: "数字图影作战指挥平台",
    },
    component: Index
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.afterEach((to) => {
  to.meta.title && (document.title = to.meta.title)
})

export default router;