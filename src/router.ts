import { createMemoryHistory, createRouter } from 'vue-router'

import QrCreator from './components/QrCreator.vue'
import EncodingExplainer from './components/EncodingExplainer.vue'

const routes = [
	{ path: '/', component: QrCreator },
	{ path: '/qr', component: QrCreator },
	{ path: '/encoding-explainer', component: EncodingExplainer },
]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})