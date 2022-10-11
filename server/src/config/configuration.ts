
export default () => {
  return {
    session_secret: process.env.SESSION_SECRET,
    port: parseInt(process.env.PORT, 10) || 3000,
    database_type: process.env.NADO_DATABASE_TYPE,
    naver_login: {
      clientId: process.env.NAVER_LOGIN_CLIENT_ID,
      clientSecret: process.env.NAVER_LOGIN_CLIENT_SECRET,
      callbackUrl: process.env.NAVER_LOGIN_CALLBACK_URL
    },
    database: {
      host: process.env.NADO_MYSQL_HOST,
      port: process.env.NADO_MYSQL_PORT || 3306,
      user: process.env.NADO_MYSQL_USER,
      passwd: process.env.NADO_MYSQL_PASSWORD,
      database: process.env.NADO_MYSQL_DATABASE
    }
  }
}
