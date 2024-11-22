import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config
export default defineConfig({
    server:{
        port: 30000,
        host: 'localhost',
        proxy:{
            '/dev-api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/dev-api/, '')
            }
        }
    },
    plugins: [
        // 自动导入插件
        AutoImport({
            resolvers: [ElementPlusResolver(),
                IconsResolver({
                    prefix: 'Icon',
                }),],
            imports: ['vue', 'vue-router', 'pinia']
        }),
        Components({
            dirs: ['src/components'],
            resolvers: [ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),],
        }),
        vue(),
        Icons({
            autoInstall: true,
        }),

    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue', '.jpg'],
        alias: {
            // 设置路径
            '~': path.resolve(__dirname, './'),
            // 设置别名
            '@': path.resolve(__dirname, './src'),
        },
    },
});
