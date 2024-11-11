import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config
export default defineConfig({

    plugins: [
        // 自动导入插件
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports:['vue', 'vue-router', 'pinia']
        }),
        Components({
            dirs:['src/components'],
            resolvers: [ElementPlusResolver()],
        }),
        vue(),
    ],
    resolve:{
        extensions:['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
        alias: {
            // 设置路径
            '~': path.resolve(__dirname, './'),
            // 设置别名
            '@': path.resolve(__dirname, './src')
        },
    },
});
