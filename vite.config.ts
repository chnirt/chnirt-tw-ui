import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
// import react from '@vitejs/plugin-react'
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isBuildLib = process.env.VITE_BUILD_LIB === "true";

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    plugins: [react(), dts(), libCss()],
    ...(isBuildLib
      ? {
          server: {
            port: parseInt(process.env.VITE_PORT),
          },
          build: {
            cssCodeSplit: true,
            lib: {
              // Could also be a dictionary or array of multiple entry points
              entry: resolve(__dirname, "src/index.tsx"),
              name: "MyLib",
              // the proper extensions will be added
              fileName: "my-lib",
              formats: ["es", "umd"],
              // fileName: (format) => `my-lib.${format}.js`,
            },
            rollupOptions: {
              // make sure to externalize deps that shouldn't be bundled
              // into your library
              external: ["react"],
              output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                  react: "React",
                },
              },
            },
          },
        }
      : {}),
  });
};
