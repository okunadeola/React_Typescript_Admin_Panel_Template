import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// import { defineConfig } from "vite";

// export default defineConfig({
//   ...
//   optimizeDeps: {
//     exclude: ['js-big-decimal']
//   }
// });


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
