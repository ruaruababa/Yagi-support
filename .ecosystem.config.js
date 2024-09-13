module.exports = {
  apps: [
    {
      name: 'yagi-app',
      script: 'yarn',
      args: 'start', // Arguments passed to the npm script
      instances: 1, // Set instances to "max" to scale across all available CPUs
      exec_mode: 'cluster', // Enable clustering mode for load balancing
      env: {
        NODE_ENV: 'production', // Environment variables for production
        PORT: 8899, // You can set the port (or leave as default)
      },
      env_development: {
        NODE_ENV: 'development', // Environment variables for development
        PORT: 8899,
      },
      watch: false, // Turn off watching in production mode
      max_memory_restart: '1G', // Restart if memory usage exceeds 1GB
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
