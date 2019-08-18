import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";
import pkg from "./package.json";

module.exports = {
  input: "src/main.js",
  external: ["@testing-library/dom", "riot"],
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  plugins: [
    resolve(),
    commonjs(),
    buble({
      exclude: ["node_modules/**"],
      objectAssign: "Object.assign"
    })
  ]
};
