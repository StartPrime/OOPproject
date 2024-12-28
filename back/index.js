import express from 'express'
import 'colors'
import 'dotenv/config'
import cors from 'cors'
import sequelize from './db.js'
import { validationResult } from 'express-validator'
import { userAnimalController } from './controllers/AnimalController.js'
import { adminAnimalController } from './controllers/AnimalController.js'
import CheckToken from './utils/CheckToken.js'
import CheckAdmin from './utils/CheckAdmin.js'
import { reportController } from './controllers/ReportController.js'
import UserController from './controllers/UserController.js'
import { userApplicationController } from './controllers/ApplicationController.js'
import { adminApplicationController } from './controllers/ApplicationController.js'

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

// Регистрация
app.post('/auth/register', UserController.register)
// Авторизация
app.post('/auth/authorization', UserController.authorization)
// Проверка валидности админа
app.post('/adminValid', CheckToken, CheckAdmin, (req, res) => {
	res.json({ massage: 'ок' })
})
// Проверка что токен валиден
app.post('/token', CheckToken, (req, res) => {
	res.json({ response: 'ок' })
})
// Добавление животного
app.post('/admin', CheckToken, CheckAdmin, adminAnimalController.animalAdd)
// Получить всех животных
app.get('/animals', userAnimalController.getAllTheAnimals)
// Удаление животного
app.post(
	'/admin/del',
	CheckToken,
	CheckAdmin,
	adminAnimalController.deleteAnimal
)
// Получить животное по id admin
app.post('/admin/:id', CheckToken, CheckAdmin, adminAnimalController.getAnimal)
// Изменить данные о животном
app.patch(
	'/admin/:id',
	CheckToken,
	CheckAdmin,
	adminAnimalController.editAnimal
)
// Получить животное по id user
app.post('/animal/:id', userAnimalController.getAnimal)

// Информация заявки для пользователя
app.post(
	'/animal/application/:id',
	CheckToken,
	userApplicationController.application
)
// Создание заявки
app.post(
	'/createApplication',
	CheckToken,
	userApplicationController.createApplication
)
app.post(
	'/getApplications',
	CheckAdmin,
	adminApplicationController.returnApplications
)
app.post(
	'/applicationUpdate',
	CheckAdmin,
	adminApplicationController.changeStatusApplication
)
// Статистика усыновлений
app.get('/AdoptionStatistics', reportController.AdoptionStatistics)
// Динамика усыновлений
app.get('/AdoptionApplicationTrends', reportController.UserActivityStatistics)

async function connectToDatabase() {
	try {
		await sequelize.authenticate()
		console.log('Подключение к БД успешно!')
		await sequelize.sync()
		console.log('Сверено успешно')
	} catch (error) {
		console.error('Ошибка при подключении к БД:', error)
	}
}

async function start() {
	await connectToDatabase()
	app.listen(PORT, err => {
		if (err) {
			return console.log(err)
		}
		console.log(`Сервер запустился на порте ${PORT}`.bgBlue)
	})
}

start()
