import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";

Vue.use(VueRouter);

const Router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});

export default Router;
