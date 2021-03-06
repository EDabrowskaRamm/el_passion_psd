/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const dotenv = require('dotenv')
const webpack = require('webpack')
const withOffline = require('next-offline')
const withImages = require('next-images')

const applicationEnv = process.env.APPLICATION_ENV || 'development'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
const envConfig = dotenv.parse(fs.readFileSync(`config/${applicationEnv}.env`))

const exportsMap = require('./exports-map.js')

const analizeConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html'
    }
  }
}

const nextConfig = {
  ...analizeConfig,
  exportPathMap: () => exportsMap,
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          ...envConfig,
          NODE_ENV: process.env.NODE_ENV
        })
      })
    )

    config.module.rules.push(
      {
        test: /\.(svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../../../',
              emitFile: false,
              name (file) {
                return `${file.split('/public/')[1]}?[sha512:hash:base64:7]`
              }
            }
          }
        ]
      },
      {
        test: /\.ya?ml$/,
        loader: ['bundle-loader', 'json-loader', 'yaml-loader'],
      },
    )

    return config
  },
  serverRuntimeConfig: { // Will only be available on the server side
    mySecret: process.env.SOME_SECRET_KEY
  },
}

module.exports = withBundleAnalyzer(withOffline(withImages(nextConfig)))
