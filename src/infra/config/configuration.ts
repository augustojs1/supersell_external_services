export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    tag: process.env.DB_TAG,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire_time: process.env.JWT_EXPIRE_TIME,
  },
  supersell_external_service: {
    host: process.env.SUPERSELL_EXTERNAL_SERVICE_HOST,
    port: Number(process.env.SUPERSELL_EXTERNAL_SERVICE_PORT),
  },
  ethereal_smtp: {
    host: process.env.ETHEREAL_SMTP_HOST,
    port: Number(process.env.ETHEREAL_SMTP_PORT),
    user: process.env.ETHEREAL_SMTP_USER,
    pass: process.env.ETHEREAL_SMTP_PASS,
  },
  email: {
    admin: process.env.ADMIN_EMAIL,
  },
});
