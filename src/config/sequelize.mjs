import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'mysql', // ou postgres
});

export default sequelize;