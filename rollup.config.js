const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const path = require('path');

module.exports = [
  // Browser build for lib
  {
    input: path.join(__dirname, 'src/lib/index.ts'),
    output: {
      file: path.join(__dirname, 'build/browser/index.js'),
      format: 'iife',
      name: 'gauntface.dpad',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './build/browser',
        rootDir: './src/lib'
      })
    ]
  },
  // Browser build for helper
  {
    input: path.join(__dirname, 'src/helper/dpad.ts'),
    output: {
      file: path.join(__dirname, 'build/helper/dpad.js'),
      format: 'iife',
      name: 'gauntface.dpad',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './build/helper',
        rootDir: './src'
      })
    ]
  },
  {
    input: path.join(__dirname, 'src/helper/dpad-debugger.ts'),
    output: {
      file: path.join(__dirname, 'build/helper/dpad-debugger.js'),
      format: 'iife',
      name: 'gauntface.dpad',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './build/helper',
        rootDir: './src'
      })
    ]
  }
];
