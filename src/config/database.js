import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('gallery_db', 'root', '225009777', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+07:00', // Waktu Jakarta (UTC+7)
});

export default sequelize;
