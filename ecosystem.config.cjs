module.exports = {
  apps: [
    {
      name: 'dharmicparents-website',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=dharmicparents-db --local --compatibility-date=2024-01-01 --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 5,
      min_uptime: '10s',
      max_memory_restart: '300M'
    }
  ]
}