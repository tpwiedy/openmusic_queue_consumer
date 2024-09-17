const config = {
  app: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  mailtrap: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  rabbitmq: {
    server: process.env.RABBITMQ_SERVER,
  },
};

module.exports = config;
