module.exports = {
  apps: [{
    name: 'dwjBE',
    script: './bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch: [ // 不用监听的文件
      'node_modules',
      'pm2Logs'
    ],
    max_memory_restart: '1G',
    min_uptime: '60s',
    max_restarts: 30,
    error_file: "./pm2Logs/dwj_ms_error.log",
    out_file: "./pm2Logs/dwj_ms_out.log",
    pid_file: "./pm2Logs/dwj_ms_pid.log",
    env_pro: {
      "NODE_ENV": "production",
      "REMOTE_ADDR": ""
    },
    env_dev: {
      "NODE_ENV": "development",
      "REMOTE_ADDR": ""
    },
    env_test: {
      "NODE_ENV": "test",
      "REMOTE_ADDR": ""
    }
  }]
};