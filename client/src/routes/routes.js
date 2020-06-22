import Vue from 'vue'
import vueRouter from 'vue-router'
import Main from '@/components/main/Main.vue'
import Home from '@/components/main/Home.vue'
import Location from '@/components/main/Location.vue'
import Menu from '@/components/main/menus/Menu.vue'
import Items from '@/components/main/menus/Items.vue'
import AllItems from '@/components/main/menus/AllItems.vue'

import Admin from '@/components/admin/Admin.vue'
import Management from '@/components/admin/Management.vue'
import Login from '@/components/admin/Login.vue'
import EditMenu from '@/components/admin/EditMenu.vue'

Vue.use(vueRouter)

const routes = [
  { path: '/', name: 'Main', component: Main, children: [
    { path: '', name: 'Home', component: Home },
    { path: '/menu', name: 'Menu', component: Menu, children: [
      { path: '', component: AllItems },
      { path: ':category', component: Items}
    ] },
    { path: '/location', name: 'Location', component: Location },
  ] },
  
  
  { path: '/admin', name: 'Admin', component: Admin, children: [
    { path: '', name: 'Management', component: Management, children: [
      { path: 'edit/:category', name: 'EditMenu', component: EditMenu }
    ] },
    { path: 'login', name: 'Login', component: Login }
  ] }, 
]

const router = new vueRouter({
  routes,
  mode: 'history'
})

export default router