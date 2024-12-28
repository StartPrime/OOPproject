import AnimalModel from '../db_models/AnimalModel.js'
import { QueryTypes } from 'sequelize'
import sequelize from '../db.js'
import 'dotenv/config'
class UserAnimalController {
	async getAllTheAnimals(req, res) {
		try {
			const animals = await sequelize.query(
				'SELECT id, name, photo FROM animals',
				{ type: QueryTypes.SELECT }
			)
			res.json(animals)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при получении животных' })
		}
	}

	async getAnimal(req, res) {
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
}

class AdminAnimalController extends UserAnimalController {
	async animalAdd(req, res) {
		try {
			let type = await AnimalModel.Types.findOne({
				where: { type: req.body.type },
			})
			if (!type) {
				type = await AnimalModel.Types.create({
					type: req.body.type,
				})
			}

			let breed = await AnimalModel.Breeds.findOne({
				where: { breed: req.body.breed },
			})
			if (!breed) {
				breed = await AnimalModel.Breeds.create({
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
			res.status(500).json({ success: false, err: err })
		}
	}

	async deleteAnimal(req, res) {
		try {
			const deletedAnimal = await AnimalModel.Animals.destroy({
				where: { id: req.body.id },
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

	async editAnimal(req, res) {
		try {
			const { name, age, sex, description, photo, date, status, type, breed } =
				req.body.animalData

			if (!type || !breed) {
				return res
					.status(400)
					.json({ message: 'Необходимо указать type и breed' })
			}

			const typeRecord = await AnimalModel.Types.findOne({ where: { type } })
			if (!typeRecord) {
				return res.status(400).json({ message: 'Тип не найден' })
			}
			const typeId = typeRecord.id

			const breedRecord = await AnimalModel.Breeds.findOne({ where: { breed } })
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
				{ where: { id: req.params.id } }
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
}

export const userAnimalController = new UserAnimalController()
export const adminAnimalController = new AdminAnimalController()
