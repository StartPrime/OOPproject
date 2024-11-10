import express from 'express'
import 'colors'
import 'dotenv/config'
import cors from 'cors'
import sequelize from './db.js'
import { registerValidation } from './validations/RegisterValidation.js'
import { validationResult } from 'express-validator'
import * as UserController from './controllers/UserController.js'

class App {
	constructor() {
		this.app = express()
		this.PORT = process.env.PORT || 8000
		this.initializeMiddlewares()
		this.routes()
	}

	initializeMiddlewares() {
		this.app.use(express.json())
		this.app.use(cors())
	}

	routes() {
		// Регистрация
		this.app.post('/auth/register', registerValidation, UserController.register)
	}

	async connectToDatabase() {
		try {
			await sequelize.authenticate()
			console.log('Подключение к БД успешно!')
			await sequelize.sync()
			console.log('Сверено успешно')
		} catch (error) {
			console.error('Ошибка при подключении к БД:', error)
		}
	}

	async start() {
		await this.connectToDatabase()
		this.app.listen(this.PORT, err => {
			if (err) {
				return console.log(err)
			}
			console.log(`Сервер запустился на порте ${this.PORT}`.bgBlue)
		})
	}
}

const appInstance = new App()
appInstance.start()
