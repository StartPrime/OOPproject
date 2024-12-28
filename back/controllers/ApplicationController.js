import UserModel from '../db_models/UserModel.js'
import AnimalModel from '../db_models/AnimalModel.js'
import jwt from 'jsonwebtoken'
import ApplicationModel from '../db_models/ApplicationsModel.js'
import sequelize from '../db.js'

class UserApplicationController {
	// Создание заявки
	async createApplication(req, res) {
		try {
			const application = await ApplicationModel.Applications.create({
				animalId: req.body.animalId,
				userId: jwt.verify(req.body.token, process.env.KEY).id,
				date: new Date(),
				status: 'новая',
				info: req.body.info,
			})
			return res.json({ message: 'Заявка создана успешно' })
		} catch (e) {
			res.status(500).json({ error: e, key: req.body.animalId })
		}
	}
	// Получение информации по заявке
	async application(req, res) {
		try {
			const userId = jwt.verify(req.body.token, 'secret').id
			const animalId = req.params.id

			const user = await UserModel.Users.findOne({
				where: {
					id: userId,
				},
			})

			if (!user) {
				return res.json({
					message: 'Пользователь не найден',
				})
			}

			const animal = await AnimalModel.Animals.findOne({
				where: {
					id: animalId,
				},
				include: [
					{
						model: AnimalModel.Types,
						attributes: ['type'],
					},
					{
						model: AnimalModel.Breeds,
						attributes: ['breed'],
					},
				],
			})

			if (!animal) {
				return res.json({
					message: 'Животное не найдено',
				})
			}

			return res.json({
				user: user,
				animal: animal,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({ message: 'Ошибка сервера' })
		}
	}
}

class AdminApplicationController {
	// Получение информации по заявке
	async application(req, res) {
		try {
			const userId = jwt.verify(req.body.token, 'secret').id
			const animalId = req.params.id

			const user = await UserModel.Users.findOne({
				where: {
					id: userId,
				},
			})

			if (!user) {
				return res.json({
					message: 'Пользователь не найден',
				})
			}

			const animal = await AnimalModel.Animals.findOne({
				where: {
					id: animalId,
				},
				include: [
					{
						model: AnimalModel.Types,
						attributes: ['type'],
					},
					{
						model: AnimalModel.Breeds,
						attributes: ['breed'],
					},
				],
			})

			if (!animal) {
				return res.json({
					message: 'Животное не найдено',
				})
			}

			return res.json({
				user: user,
				animal: animal,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({ message: 'Ошибка сервера' })
		}
	}

	// Возврат всех заявок
	async returnApplications(req, res) {
		try {
			const query = `
                SELECT 
                    a.id AS application_id, 
                    a.date AS application_date, 
                    a.status AS application_status, 
                    a.info AS application_info, 
                    an.name AS animal_name, 
                    an.age AS animal_age, 
                    an.sex AS animal_sex, 
                    an.description AS animal_description, 
                    an.photo AS animal_photo, 
                    an.date AS animal_date, 
                    an.status AS animal_status, 
                    at.type AS animal_type, 
                    ab.breed AS animal_breed, 
                    u.name AS user_name, 
                    u.surname AS user_surname, 
                    u.email AS user_email, 
                    u.phone AS user_phone 
                FROM 
                    Applications a
                JOIN 
                    Animals an ON a."animalId" = an.id
                JOIN 
                    Types at ON an."typeId" = at.id
                JOIN 
                    Breeds ab ON an."breedId" = ab.id
                JOIN 
                    Users u ON a."userId" = u.id
            `

			const applications = await sequelize.query(query, {
				type: sequelize.QueryTypes.SELECT,
			})
			return res.json(applications)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Не удалось получить заявки' })
		}
	}

	// Смена статуса заявки
	async changeStatusApplication(req, res) {
		try {
			const application = await ApplicationModel.Applications.update(
				{
					status: req.body.status,
				},
				{
					where: {
						id: req.body.id,
					},
				}
			)
			res.status(200).json({ message: 'Статус заявки изменен' })
		} catch (err) {
			console.log(err)
			res.status(500).json({ message: 'Ошибка при изменении статуса' })
		}
	}
}

export const userApplicationController = new UserApplicationController()
export const adminApplicationController = new AdminApplicationController()
