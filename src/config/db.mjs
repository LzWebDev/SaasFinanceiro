import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,     // nome do banco
    process.env.DB_USER,     // usuário do banco
    process.env.DB_PASS,     // senha
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false, // define como true se quiser ver os logs SQL no terminal
    }
  );
  
export default db;