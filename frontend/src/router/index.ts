import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/IndexView.vue')
    },
    {
      path: '/rekap-lakalantas',
      name: 'rekap-lakalantas',
      component: () => import('../views/command-center/LakaLantasView.vue')
    },
    {
      path: '/pengumuman',
      name: 'pengumuman',
      component: () => import('../views/command-center/AnnouncesView.vue')
    },
    {
      path: '/pengaturan-form',
      name: 'pengaturan-form',
      component: () => import('../views/command-center/FormView.vue')
    },
    {
      path: '/data-petugas',
      name: 'data-petugas',
      component: () => import('../views/command-center/StaffView.vue')
    },
    {
      path: '/laporan',
      name: 'laporan',
      component: () => import('../views/command-center/ReportView.vue')
    },
    {
      path: '/example/icons',
      name: 'example-icons',
      component: () => import('../views/examples/IconView.vue')
    },
    {
      path: '/example/buttons',
      name: 'example-buttons',
      component: () => import('../views/examples/ButtonView.vue')
    },
    {
      path: '/example/modals',
      name: 'example-modals',
      component: () => import('../views/examples/ModalView.vue')
    },
    {
      path: '/example/checkbox',
      name: 'example-checkbox',
      component: () => import('../views/examples/CheckboxView.vue')
    },
    {
      path: '/example/pagination',
      name: 'example-pagination',
      component: () => import('../views/examples/PaginationView.vue')
    },
    {
      path: '/example/input',
      name: 'example-input',
      component: () => import('../views/examples/InputView.vue')
    },
    {
      path: '/example/select',
      name: 'example-select',
      component: () => import('../views/examples/SelectView.vue')
    },
    {
      path: '/example/card',
      name: 'example-card',
      component: () => import('../views/examples/CardView.vue')
    },
    {
      path: '/example/table',
      name: 'example-table',
      component: () => import('../views/examples/TableView.vue')
    },
    {
      path: '/example/chart',
      name: 'example-chart',
      component: () => import('../views/examples/ChartView.vue')
    },
  ]
});

export default router;