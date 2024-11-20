import { defineConfig } from 'vite';
import path from "path";


// https://vitejs.dev/config
export default defineConfig({

    base: './',
    build:{
        rollupOptions:{
            external:['better-sqlite3']
        }
    },
    resolve:{
        alias:{
            '@': path.resolve(__dirname, './src'),
        }
    }
});
