import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

export const User = sequelize.define(
	'users',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		surname: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, unique: true, allowNull: true },
		phone: { type: DataTypes.STRING, unique: true, allowNull: true },
		passwordHash: { type: DataTypes.STRING, allowNull: false },
		role: {
			type: DataTypes.ENUM('пользователь', 'администратор'),
			allowNull: false,
		},
	},
	{
		validate: {
			eitherEmailOrPhone() {
				if (!this.email && !this.phone) {
					throw new Error(
						'Должно быть заполнено хотя бы одно поле: email или телефон'
					)
				}
			},
		},
	}
)
