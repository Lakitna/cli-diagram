import typescript from '@rollup/plugin-typescript';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/diagram.ts',
  output: {
    file: 'dist/index.mjs',
    format: 'es',
  },
  plugins: [typescript()]
};
