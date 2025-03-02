import { defineConfig } from "tsup";

export default defineConfig({
  name: "baity",
  entry: ["src/server.ts"],
  outDir: "dist",
  clean: true,
  format: ["cjs", "esm"],
  minify: true,
  sourcemap: true,
  splitting: false,
});
