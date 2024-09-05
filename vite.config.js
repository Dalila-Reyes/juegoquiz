import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración para GitHub Pages
export default defineConfig({
  base: '/juegoquiz/', // Ajusta esto según tu ruta de GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      'phaser3-rex-plugins': 'phaser3-rex-plugins/dist/rexplugins.min.js', // Alias para el plugin
    },
  },
});


// Local (descomentado si es necesario)
/*
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
