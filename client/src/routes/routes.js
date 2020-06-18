import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Location from '@/components/Location.vue'
import Menu from '@/components/Menu.vue'
import Items from '@/components/menus/Items.vue'
import AllItems from '@/components/menus/AllItems.vue'

Vue.use(vueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/menu', name: 'Menu', component: Menu, children: [
    { path: '', component: AllItems },
    { path: ':category', component: Items}
  ] },
  { path: '/location', name: 'Location', component: Location }
]

const router = new vueRouter({
  routes
})

export default router