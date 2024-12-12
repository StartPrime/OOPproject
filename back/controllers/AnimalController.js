import AnimalModel from '../db_models/AnimalModel.js'
import { QueryTypes } from 'sequelize'
import sequelize from '../db.js'

const AnimalAdd = async (req, res) => {
	try {
		var type = await AnimalModel.Types.findOne({
			where: {
				type: req.body.type,
			},
		})
		if (!type) {
			var type = await AnimalModel.Types.create({
				type: req.body.type,
			})
		}

		var breed = await AnimalModel.Breeds.findOne({
			where: { breed: req.body.breed },
		})
		if (!breed) {
			var breed = await AnimalModel.Breeds.create({
				breed: req.body.breed,
				typeId: type.id,
			})
		}

		const animal = await AnimalModel.Animals.create({
			name: req.body.name,
			typeId: type.id,
			breedId: breed.id,
			age: req.body.age,
			sex: req.body.sex,
			description: req.body.description,
			photo: req.body.photo,
			date: req.body.date,
			status: req.body.status,
		})

		res.json('ок')
	} catch (err) {
		res.status(500).json({
			success: false,
			err: err,
		})
	}
}

const GetAllTheAnimals = async (req, res) => {
	try {
		const animals = await sequelize.query(
			'SELECT id, name, photo FROM animals',
			{
				type: QueryTypes.SELECT,
			}
		)
		// const animals = await AnimalModel.Animals.findAll({
		// 	attributes: ['id', 'name', 'photo'],
		// })
		res.json(animals)
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при получении животных' })
	}
}

const DeleteAnimal = async (req, res) => {
	try {
		// const result = await sequelize.query('DELETE FROM Animals WHERE id = $1', {
		// 	replacements: [req.body.id],
		// 	type: QueryTypes.DELETE,
		// })

		// if (result[1] > 0) {
		// 	// result[1] содержит количество затронутых строк
		// 	res.json({ message: 'Животное успешно удалено' })
		// } else {
		// 	res.status(404).json({ message: 'Животное не найдено' })
		// }
		const deletedAnimal = await AnimalModel.Animals.destroy({
			where: {
				id: req.body.id,
			},
		})

		if (deletedAnimal) {
			res.json({ message: 'Животное успешно удалено' })
		} else {
			res.status(404).json({ message: 'Животное не найдено' })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Ошибка при удалении животного' })
	}
}

const GetAnimal = async (req, res) => {
	try {
		const animalId = req.params.id

		const query = `
			SELECT 
				a.id,
				a.name,
				a.age,
				a.sex,
				a.description,
				a.photo,
				a.date,
				a.status,
				t.type AS type,
				b.breed AS breed
			FROM 
				Animals a
			LEFT JOIN 
				Types t ON a."typeId" = t.id
			LEFT JOIN 
				Breeds b ON a."breedId" = b.id
			WHERE 
				a.id = :animalId;
		`

		const [animal] = await sequelize.query(query, {
			replacements: { animalId },
			type: sequelize.QueryTypes.SELECT,
		})

		if (animal) {
			res.json(animal)
		} else {
			res.status(404).json({ message: 'Животное не найдено' })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Ошибка при получении животного' })
	}
}

// const GetAnimal = async (req, res) => {
// 	try {
// 		const animal = await AnimalModel.Animals.findOne({
// 			where: { id: req.params.id },
// 			attributes: [
// 				'id',
// 				'name',
// 				'age',
// 				'sex',
// 				'description',
// 				'photo',
// 				'date',
// 				'status',
// 			],
// 			include: [
// 				{
// 					model: AnimalModel.Types,
// 					attributes: ['type'],
// 				},
// 				{
// 					model: AnimalModel.Breeds,
// 					attributes: ['breed'],
// 				},
// 			],
// 		})

// 		if (animal) {
// 			const response = {
// 				id: animal.id,
// 				name: animal.name,
// 				age: animal.age,
// 				sex: animal.sex,
// 				description: animal.description,
// 				photo: animal.photo,
// 				date: animal.date,
// 				status: animal.status,
// 				type: animal.type.type,
// 				breed: animal.breed.breed,
// 			}
// 			res.json(response)
// 		} else {
// 			res.status(404).json({ message: 'Животное не найдено' })
// 		}
// 	} catch (error) {
// 		res.status(500).json({ message: 'Ошибка при получении животного' })
// 	}
// }

const EditAnimal = async (req, res) => {
	try {
		const { name, age, sex, description, photo, date, status, type, breed } =
			req.body.animalData

		if (!type || !breed) {
			return res
				.status(400)
				.json({ message: 'Необходимо указать type и breed' })
		}

		const typeRecord = await AnimalModel.Types.findOne({
			where: { type },
		})
		if (!typeRecord) {
			console.log(1)
			return res.status(400).json({ message: 'Тип не найден' })
		}
		const typeId = typeRecord.id

		const breedRecord = await AnimalModel.Breeds.findOne({
			where: { breed },
		})
		if (!breedRecord) {
			return res.status(400).json({ message: 'Порода не найдена' })
		}
		const breedId = breedRecord.id

		const animal = await AnimalModel.Animals.update(
			{
				name,
				age,
				sex,
				description,
				photo,
				date,
				status,
				typeId,
				breedId,
			},
			{
				where: { id: req.params.id },
			}
		)

		if (animal[0] > 0) {
			res.json({ message: 'Животное успешно изменено' })
		} else {
			res.status(404).json({ message: 'Животное не найдено' })
		}
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при изменении животного' })
	}
}

const AnimalController = {
	AnimalAdd,
	GetAllTheAnimals,
	DeleteAnimal,
	GetAnimal,
	EditAnimal,
}

export default AnimalController
