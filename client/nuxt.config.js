// import colors from 'vuetify/es5/util/colors'
import shrinkRay from 'shrink-ray-current'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  server: {
    port: process.env.NODE_ENV === 'production' ? 80 : 4100, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - EssaySpring',
    title: 'Essay Writing Service - Freelance Academic Writing Assistance EssaySpring.com - EssaySpring.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Best Essay Writing Service - Freelance Academic Writing Custom Cheap Essay Writing Online Friendly Quality' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/fonts/roboto/roboto.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/bus.js',
    { src: '~/plugins/vuex-persister.js', ssr: false }
  ],

  // generate: {
  //  fallback: '404.html'
  // },

  robots: [
    {
      UserAgent: 'Googlebot',
      Disallow: ['/client']
    },
    {
      UserAgent: '*',
      Disallow: '/client'
    }

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    'nuxt-compress'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-material-design-icons-iconfont'
  ],

  render: {
    compressor: shrinkRay({
      useZopfliForGzip: false
    })
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'EssaySpring',
      short_name: 'EssaySpring',
      theme_color: '#007991',
      background_color: 'white'
    },
    name: 'EssaySpring',
    short_name: 'EssaySpring',
    themeColor: '#007991',
    msTileColor: 'white',
    workboxOptions: {
      skipWaiting: true
    }
  },

  vue: {
    config: {
      devtools: process.env.NODE_ENV !== 'production',
      productionTip: false
    }
  },

  loading: {
    color: '#FF7653',
    continuous: true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  /*
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  */

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
    extractCss: true,
    optimization: {
      runtimeChunk: true
    }
  },

  env: {
    URL: process.env.URL
  }
}
