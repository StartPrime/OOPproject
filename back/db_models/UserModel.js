import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const Roles = sequelize.define(
	'roles',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		role: {
			type: DataTypes.ENUM('пользователь', 'администратор'),
			allowNull: false,
			unique: true,
		},
	},
	{
		timestamps: false,
	}
)

const Users = sequelize.define(
	'users',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		surname: { type: DataTypes.STRING, allowNull: false },
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true,
			defaultValue: null,
		},
		phone: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true,
			defaultValue: null,
		},
		passwordHash: { type: DataTypes.STRING, allowNull: false },
		role: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Roles,
				key: 'id',
			},
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

Users.belongsTo(Roles, { foreignKey: 'role', as: 'userRole' })
Roles.hasMany(Users, { foreignKey: 'role' })

const UserModel = {
	Users,
	Roles,
}

export default UserModel
