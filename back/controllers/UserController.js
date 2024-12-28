import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import UserModel from '../db_models/UserModel.js'
import 'dotenv/config'

class UserController {
	async register(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}
			const password = req.body.passwordHash
			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(password, salt)
			const role = await UserModel.Roles.findOne({
				where: { role: 'пользователь' },
			})
			const user = await UserModel.Users.create({
				name: req.body.name,
				surname: req.body.surname,
				email: req.body.email ? req.body.email : null,
				phone: req.body.phone ? req.body.phone : null,
				passwordHash: hash,
				role: role.id,
			})

			const token = jwt.sign(
				{
					id: user.id,
				},
				process.env.KEY,
				{ expiresIn: '30d' }
			)

			res.json({
				role: 'пользователь',
				token,
			})
		} catch (err) {
			console.log(err)
			res.status(500).json({
				success: false,
				message: 'Ошибка при регистрации пользователя',
				error: err,
			})
		}
	}

	async authorization(req, res) {
		try {
			const searchCriteria = {}

			if (req.body.email) {
				searchCriteria.email = req.body.email
			}

			if (req.body.phone) {
				searchCriteria.phone = req.body.phone
			}

			const user = await UserModel.Users.findOne({
				where: searchCriteria,
			})
			if (!user) {
				return res
					.status(401)
					.json({ success: false, message: 'Неправильный логин или пароль' })
			}

			const role = await UserModel.Roles.findOne({
				where: { id: user.role },
			})
			if (!role) {
				return res.status(401).json({ success: false, message: 'Ошибка' })
			}

			const isPasswordValid = await bcrypt.compare(
				req.body.passwordHash,
				user.passwordHash
			)
			if (!isPasswordValid) {
				return res
					.status(401)
					.json({ success: false, message: 'Неправильный логин или пароль' })
			}

			const token = jwt.sign(
				{
					id: user.id,
				},
				process.env.KEY,
				{ expiresIn: '30d' }
			)

			return res.json({
				token: token,
				role: role.role,
			})
		} catch (err) {
			console.error(err)
			res.status(500).json({
				success: false,
				message: 'Ошибка при авторизации пользователя',
			})
		}
	}
}

export default new UserController()
