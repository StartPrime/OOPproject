import UserModel from '../db_models/UserModel.js'
import AnimalModel from '../db_models/AnimalModel.js'
import jwt from 'jsonwebtoken'
import ApplicationModel from '../db_models/ApplicationsModel.js'
import sequelize from '../db.js'

// Информация по заявке
const application = async (req, res) => {
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
	}
}
// создать заявку
const createApplication = async (req, res) => {
	try {
		const application = await ApplicationModel.Applications.create({
			animalId: req.body.animalId,
			userId: jwt.verify(req.body.token, 'secret').id,
			date: new Date(),
			status: 'новая',
			info: req.body.info,
		})
		return res.json({ message: 'ок' })
	} catch (e) {
		console.log(e)
		res.json({ error: e, key: req.body.animalId })
	}
}
// вернуть все заявки
const returnApplications = async (req, res) => {
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
		return res.json({ message: 'Не удалось получить заявки' })
	}
	// try {
	// 	const applications = await ApplicationModel.Applications.findAll({
	// 		attributes: ['id', 'date', 'status', 'info'],
	// 		include: [
	// 			{
	// 				model: AnimalModel.Animals,
	// 				attributes: [
	// 					'name',
	// 					'age',
	// 					'sex',
	// 					'description',
	// 					'photo',
	// 					'date',
	// 					'status',
	// 				],
	// 				include: [
	// 					{
	// 						model: AnimalModel.Types,
	// 						attributes: ['type'],
	// 					},
	// 					{
	// 						model: AnimalModel.Breeds,
	// 						attributes: ['breed'],
	// 					},
	// 				],
	// 			},
	// 			{
	// 				model: UserModel.Users,
	// 				attributes: ['name', 'surname', 'email', 'phone'],
	// 			},
	// 		],
	// 	})
	// 	return res.json(applications)
	// } catch (error) {
	// 	console.log(error)
	// 	return res.json({ message: 'Не удалось получить заявки' })
	// }
}

//смена статуса заявки
const changeStatusApplication = async (req, res) => {
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
		res.status(200)
	} catch (err) {
		console.log(err)
		res.json({ message: 'error' })
	}
}

const ApplicationController = {
	application,
	createApplication,
	returnApplications,
	changeStatusApplication,
}

export default ApplicationController
