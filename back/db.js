import { Sequelize } from 'sequelize'
import 'dotenv/config'

// Конструктор БД
const sequelize = new Sequelize(
	process.env.DB_NAME, // Название БД
	process.env.DB_USER, // Пользователь
	process.env.DB_PASSWORD, // Пароль
	{
		dialect: 'postgres',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
	}
)

export default sequelize
