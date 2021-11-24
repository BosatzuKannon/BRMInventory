module.exports = {  
  test: {
    
    username: process.env.PG_USERNAME_TEST || 'postgres',
    password: process.env.PG_PASSWORD_TEST || null,
    database: process.env.PG_DB_TEST || "BMRInventory",
    host: process.env.PG_HOST_TEST || "127.0.0.1",
    port: process.env.PG_PORT || '3000',
    dialect: "postgres",
    timezone: "America/Bogota"
  },
  production: {
    username: process.env.PG_USERNAME_PR || 'postgres',
    password: process.env.PG_PASSWORD_PR || null,
    database: process.env.PG_DB_PR || "BMRInventory",
    host: process.env.PG_HOST_PR || "127.0.0.1",
    port: process.env.PG_PORT || '3000',
    logging: false,
    dialect: "postgres",
    timezone: "America/Bogota"
  },
  jwtSecret: process.env.JWT_SECRET
}
