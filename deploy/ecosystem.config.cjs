// PM2 process definition for cpaleasing.com
// Start/reload:  pm2 startOrReload deploy/ecosystem.config.cjs --update-env
const path = require("path");

module.exports = {
  apps: [
    {
      name: "cpa-aviation",
      cwd: path.resolve(__dirname, ".."),
      script: ".output/server/index.mjs",
      exec_mode: "fork",
      instances: 1,
      max_memory_restart: "400M",
      time: true,
      env: {
        NODE_ENV: "production",
        // Bind to localhost only: the public reaches the site through Nginx.
        HOST: "127.0.0.1",
        PORT: "3003",
        SITE_URL: "https://www.cpaleasing.com",
      },
    },
  ],
};
