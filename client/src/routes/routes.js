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
  { path: '/', component: Main, children: [
    { path: '', name: 'Home', component: Home },
    { path: '/menu', component: Menu, children: [
      { path: '', name: 'AllItems', component: AllItems },
      { path: ':category', name: 'Items', component: Items}
    ] },
    { path: '/location', name: 'Location', component: Location },
  ] },
  
  
  { path: '/admin', component: Admin ,children: [
    { path: '', name: 'Management', component: Management, meta: { isAdmin: true }, children: [
      { path: 'edit/:category', name: 'EditMenu', component: EditMenu }
    ] },
    { path: 'login', name: 'Login', component: Login }
  ] }, 
]

const router = new vueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.isAdmin)) {
    localStorage.getItem("thebasacadmin") ? next() : next('/admin/login')
  } else if(to.name === 'Login'){
    localStorage.getItem("thebasacadmin") ? next('/admin') : next()
  } else {
    next()
  }
})

export default router