import esbuild from "esbuild"
import path from "path"

// カスタムプラグインの定義
const replacePlugin = {
  name: "replace-plugin",
  setup(build: any) {
    build.onResolve({ filter: /module-a/ }, (args: any) => {
      return { path: path.resolve(args.resolveDir, "module-c.ts") }
    })
  },
}

esbuild.build({
  bundle: true,
  sourcemap: false,
  entryPoints: ["./src/main.ts"],
  outdir: "./dist",
  minify: true,
  // outExtension: {
  //   ".js": ".mjs",
  // },
  platform: "node",
  format: "esm",
  // banner: {
  //   js: 'import { createRequire } from "module"; import url from "url"; const require = createRequire(import.meta.url); const __filename = url.fileURLToPath(import.meta.url); const __dirname = url.fileURLToPath(new URL(".", import.meta.url));',
  // },
  plugins: [replacePlugin],

  // defineで環境変数の定義ができる？
})
