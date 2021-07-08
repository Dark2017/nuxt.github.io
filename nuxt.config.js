const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt.github.io',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[contenthash].js'),
    },  
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
      // 压缩代码分割部分
      splitChunks: {
        cacheGroups: {
          default: {
            name: 'commons',
            chunks: 'initial',
          },
          vendors: {
            // 拆分第三方库（通过npm|yarn安装的库）
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'initial',
            priority: -10,
          },
        },
      },
    },
    // 最大的chunk
    maxChunkSize: 10000,
    loaders: {
      imgUrl: {
        limit: 1000, // 1kb以下的图片才会转为base64
        esModule: false,
      },
    },
    // html压缩自定义
    html: {
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
      },
    },
    extend(config) {
      config.module.rules.splice(0, 0, {
        test: /\.js$/,
        include: [path.resolve(__dirname, './node_modules/swiper')],
        loader: 'babel-loader',
      })
    },
  }
}
