module.exports = {
  apps : [
    // -----------------------------------------------------
    // QAdmin
    {
      name: "qadmin-client",
      cwd: "./qadmin-client/",
      script : "npm",
      args: "start",
      watch: false,
      kill_timeout: 10000,
      max_memory_restart: '512M',
      autorestart: true,
    },
    {
      name: "qadmin-server",
      cwd: "./qadmin-server/",
      script : "nodemon",
      args: "./server.js",
      watch: false,
      kill_timeout: 10000,
      max_memory_restart: '512M',
      autorestart: true,
    },

    // -----------------------------------------------------
    // QAuth
    {
      name: "qauth-client",
      cwd: "./qauth-client/",
      script : "npm",
      args: "start",
      watch: false,
      kill_timeout: 10000,
      max_memory_restart: '512M',
      autorestart: true,
    },
    {
      name: "qauth-server",
      cwd: "./qauth-server/",
      script : "nodemon",
      args: "./server.js",
      watch: false,
      kill_timeout: 10000,
      max_memory_restart: '512M',
      autorestart: true,
    },

    // -----------------------------------------------------
    // Uptime
    {
      name: "uptime-client",
      cwd: "./uptime-client/",
      script : "npm",
      args: "start",
      watch: false,
      kill_timeout: 10000,
      max_memory_restart: '512M',
      autorestart: true,
    },
    {
      name: "uptime-server",
      cwd: "./uptime-server/",
      script : "nodemon",
      args: "./server.js",
      watch: false,
      kill_timeout: 10000,
      max_memory_restart: '512M',
      autorestart: true,
    },

    // -----------------------------------------------------
    // PGM
    {
      name: "pgm-client",
      cwd: "./pgm-client/",
      script : "npm",
      args: "start",
      watch: false,
      kill_timeout: 10000,
      max_memory_restart: '512M',
      autorestart: true,
    },
    {
      name: "pgm-server",
      cwd: "./pgm-server/",
      script : "nodemon",
      args: "./server.js",
      watch: false,
      kill_timeout: 10000,
      max_memory_restart: '512M',
      autorestart: true,
    },

    // -----------------------------------------------------
    // Home Page
    {
      name: "home-page",
      cwd: "./home-page/",
      script : "npm",
      args: "start",
      watch: false,
      kill_timeout: 10000,
      max_memory_restart: '512M',
      autorestart: true,
    },
  ],
};
