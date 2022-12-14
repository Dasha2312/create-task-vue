import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'create',
            component: Home
        },
        {
            path: '/list',
            name: 'list',
            component: () => import ('../views/List.vue')
        },
        {
            path: '/task/:id',
            name: 'task',
            component: () => import ('../views/Task.vue')
        }
    ]
})

export default router