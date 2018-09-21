import Sequelize from 'sequelize';

const sequelize = new Sequelize('chat', 'postgres', 'postgres', {
  host: 'db',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
  operatorsAliases: false,
})

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
}

Object.keys(models).forEach(model => {
  if('associate' in models[model]) {
    models[model].associate(models);
  }
})

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;