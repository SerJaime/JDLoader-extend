import babel from 'rollup-plugin-babel';

export default {
  input: './src/JDLoader_extend.js',
  output: {
    name: 'JDLoader_Ext',
    file: './dist/JDLoader_extend.js',
    format: 'umd'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // 排除node_module下的所有文件
    })
  ]
}
