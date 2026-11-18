module.exports = {
  apps: [
    {
      name: "cpa-aviation",
      script: "./.output/server/index.mjs",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 3000,
      },
    },
  ],
};
