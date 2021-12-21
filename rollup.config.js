import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.js',
  output: {
    file: 'dist/vue.js',
    // 常见格式 IIFE（自执行） ESM（es6） CJS（node） UMD（AMD和CommonJS的结合）
    format: 'umd', // umd模块需要配置name，会将导出的模块放到window上
    name: 'Vue',
    sourcemap: true, // 可以进行源代码调试
  },
  plugins:[
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}