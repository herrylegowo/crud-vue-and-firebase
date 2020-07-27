import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewData from '@/components/NewData'
import ViewData from '@/components/ViewData'
import EditData from '@/components/EditData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-data',
      component: NewData
    },
    {
      path: '/edit/:data_id',
      name: 'edit-data',
      component: EditData
    },
    {
      path: '/:data_id',
      name: 'view-data',
      component: ViewData
    }

  ]
})
