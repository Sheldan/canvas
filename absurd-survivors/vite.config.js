import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        base: './',
        root: 'src',
        outDir: '../dist/survivors'
    },
})