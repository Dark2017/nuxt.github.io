const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')
const path = require('path')

export default new SkeletonPlugin({
  pathname: path.resolve(__dirname, '../shell'),
  staticDir: path.resolve(__dirname, '../nuxt'),
  routes: ['/'],
})