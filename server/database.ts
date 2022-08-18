const Sequelize = require('sequelize');

export const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST || 'localhost',
    port: 5432,
    dialect: 'postgres'
  }
)
