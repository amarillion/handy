import { createMemoryHistory, createRouter } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import QrCreator from './components/QrCreator.vue'
import EncodingExplainer from './components/EncodingExplainer.vue'

const routes = [
	{ path: '/', component: HelloWorld },
	{ path: '/qr', component: QrCreator },
	{ path: '/encoding-explainer', component: EncodingExplainer },
]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})