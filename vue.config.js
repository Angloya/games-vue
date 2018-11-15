module.exports = {
  // options...
  baseUrl: process.env.NODE_ENV === 'production' ? '/games/' : '/',

  // Other options include:
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}
