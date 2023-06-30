import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const pathSegments = path.dirname(filename);

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**')],
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(pathSegments, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  ssgOptions: {
    mock: true,
    dirStyle: 'nested'
  },
  ssr: {
    // SSG Vue-i18n workaround
    noExternal: [/vue-i18n/],
  }
})