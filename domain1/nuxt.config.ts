// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      AUTHORIZATION_ENDPOINT: process.env.AUTHORIZATION_ENDPOINT,
      LOGOUT_ENDPOINT: process.env.LOGOUT_ENDPOINT,
      RESOURCE_ENDPOINT: process.env.RESOURCE_ENDPOINT,
      SAVE_TOKEN_ENDPOINT: process.env.SAVE_TOKEN_ENDPOINT,
      GET_TOKEN_ENDPOINT: process.env.GET_TOKEN_ENDPOINT,
      TOKEN_ENDPOINT: process.env.TOKEN_ENDPOINT,
      OAUTH_RESPONSE_TYPE: 'code',
      REDIRECT_URI: process.env.LOGIN_CALLBACK,
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
      IAM_SCOPES: process.env.IAM_SCOPES,
    }
  },
  devServer: {
    port: parseInt(process.env.PORT || '3001')
  }
})
