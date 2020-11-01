module.exports = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}
