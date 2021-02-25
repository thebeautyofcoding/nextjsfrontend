

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.API_PRODUCTION : publicRuntimeConfig.API_DEVELOPMENT

export const APP_NAME = process.env.APP_NAME

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PRODUCTION : publicRuntimeConfig.DOMAIN_DEVELOPMENT

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID