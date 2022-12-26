import path from "path"
// eslint-disable-next-line no-unused-vars
import { env } from "process"
import dns from "dns"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Resolve localhost for Node v16 and older.
// @see https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder("verbatim")

export default defineConfig({
  plugins: [react()],
  // Backwards-compat with Gatsby.
  publicDir: "static",
  build: {
    outDir: "public",
  },
  resolve: {
    alias: {
      gatsby: path.resolve(__dirname, "src/compat/gatsby-compat.tsx"),
      "@reach/router": path.resolve(
        __dirname,
        "src/compat/reach-router-compat.tsx"
      ),
    },
  },
  define: {
    __MEDUSA_BACKEND_URL__: JSON.stringify("http://localhost:9000"),
  },
  optimizeDeps: {
    exclude: ["typeorm", "medusa-interfaces"],
  },
})
