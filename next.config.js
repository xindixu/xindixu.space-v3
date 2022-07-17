module.exports = {
  images: {
    deviceSizes: [
      320, 420, 768, 1024, 1112, 1366, 1440, 1680, 1920, 2048, 3840,
    ],
    domains: ["images.ctfassets.net"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  typescript: {
    // FIXME: Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // FIXME: Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
