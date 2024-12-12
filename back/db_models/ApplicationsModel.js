import sequelize from '../db.js'
import AnimalModel from './AnimalModel.js'
import UserModel from './UserModel.js'
import { DataTypes } from 'sequelize'

const Applications = sequelize.define('applications', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	animalId: {
		type: DataTypes.INTEGER,
		references: {
			model: AnimalModel.Animals,
			key: 'id',
		},
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: UserModel.Users,
			key: 'id',
		},
		allowNull: false,
	},
	date: { type: DataTypes.DATE, allowNull: false },
	status: {
		type: DataTypes.ENUM('новая', 'одобрена', 'отклонена', 'в рассмотрении'),
		allowNull: false,
	},
	info: { type: DataTypes.TEXT, allowNull: true },
})

Applications.belongsTo(AnimalModel.Animals, {
	foreignKey: 'animalId',
})
Applications.belongsTo(UserModel.Users, { foreignKey: 'userId' })

const ApplicationModel = {
	Applications,
}

export default ApplicationModel
