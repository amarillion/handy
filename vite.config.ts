import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ vue() ],
	base: './', // Use relative paths in index.html, makes our app relocatable.
});
