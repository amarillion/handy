import { createMemoryHistory, createRouter } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import QrCreator from './components/QrCreator.vue'

const routes = [
	{ path: '/', component: HelloWorld },
	{ path: '/qr', component: QrCreator },
]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})