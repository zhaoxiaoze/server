const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;
const port = process.env.PORT || config.port;

// 先启动HTTP服务，保证云托管健康检查可以通
server = app.listen(port, () => {
  logger.info(`Listening to port ${port}`);
  // http启动后再连接数据库
  mongoose.connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((err) => {
      logger.error('MongoDB connect failed', err);
    });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close(() => {
      logger.info('HTTP server closed on SIGTERM');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
