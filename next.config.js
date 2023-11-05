/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/order */
/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

module.exports = withPlugins([withBundleAnalyzer], {
  compiler: {
    styledComponents: true,
  },

  images: {
    //S3 이미지 주소 설정
    domains: ['next-on-front-asset.s3.ap-northeast-2.amazonaws.com'],
  },

  reactStrictMode: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
});
