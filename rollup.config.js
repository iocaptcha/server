import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/manager.ts',
  output: [
    {
      format: 'cjs',
      file: "dist/server.cjs"
    },
    {
      format: 'esm',
      file: "dist/server.mjs"
    }
  ],
  plugins: [typescript()]
};