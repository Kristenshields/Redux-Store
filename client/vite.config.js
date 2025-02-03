import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Port for the Vite client
    open: true,  // Automatically open the browser
    proxy: {
      '/graphql': {
        target: 'http://localhost:8080',  // Ensure this is the correct port for your GraphQL server
        changeOrigin: true,
        secure: false,
        onProxyReq: (proxyReq, req, res) => {
          // Log the URL of the request to /graphql to verify it's being proxied correctly
          console.log('Request URL:', req.url);
        },
      }
    }
  }
})

