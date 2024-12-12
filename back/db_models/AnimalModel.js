import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const Types = sequelize.define('types', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	type: { type: DataTypes.STRING, allowNull: false, unique: true },
})

const Breeds = sequelize.define('breeds', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	breed: { type: DataTypes.STRING, allowNull: false, unique: true },
	typeId: {
		type: DataTypes.INTEGER,
		references: {
			model: Types,
			key: 'id',
		},
		allowNull: false,
	},
})

const Animals = sequelize.define('animals', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	typeId: {
		type: DataTypes.INTEGER,
		references: {
			model: Types,
			key: 'id',
		},
		allowNull: false,
	},
	breedId: {
		type: DataTypes.INTEGER,
		references: {
			model: Breeds,
			key: 'id',
		},
		allowNull: false,
	},
	age: { type: DataTypes.INTEGER, allowNull: false },
	sex: { type: DataTypes.ENUM('самец', 'самка'), allowNull: false },
	description: { type: DataTypes.TEXT, allowNull: false },
	photo: { type: DataTypes.TEXT, allowNull: false },
	date: { type: DataTypes.DATE, allowNull: false },
	status: { type: DataTypes.ENUM('в приюте', 'в семье'), allowNull: false },
})

// Установление связей между моделями
Types.hasMany(Breeds, { foreignKey: 'typeId' })
Breeds.belongsTo(Types, { foreignKey: 'typeId' })

Types.hasMany(Animals, { foreignKey: 'typeId' })
Animals.belongsTo(Types, { foreignKey: 'typeId' })

Breeds.hasMany(Animals, { foreignKey: 'breedId' })
Animals.belongsTo(Breeds, { foreignKey: 'breedId' })

const AnimalModel = {
	Types,
	Breeds,
	Animals,
}

export default AnimalModel
