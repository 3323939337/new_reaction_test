import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from '@/components/main.vue'

const router = createRouter({
    history: createWebHashHistory(),
    mode: "hash",
    routes: [
        {
            path: '/',
            redirect: '/HomeView'
        },
        {
            path: '/HomeView',
            name: 'HomeView',
            component: () => import('@/components/main.vue')
        },
        {
            path:'/testRes',
            name:'testRes',
            component: () => import('@/components/testRes.vue')
        }
    ]
})

export default router;