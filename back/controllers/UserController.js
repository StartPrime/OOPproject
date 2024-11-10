import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { User } from '../db_models/UserModel.js'

export const register = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const password = req.body.passwordHash
		const salt = await bcrypt.genSalt(10) // Метод шифрования
		const hash = await bcrypt.hash(password, salt) // Создание зашифрованного пароля

		const user = await User.create({
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			phone: req.body.phone,
			passwordHash: hash,
			role: 'пользователь',
		})

		// Токен пользователя
		const token = jwt.sign(
			{
				id: user.id,
			},
			'secret',
			{ expiresIn: '30d' }
		)

		res.json({
			user: {
				id: user.id,
				email: user.email,
				updatedAt: user.updatedAt,
				createdAt: user.createdAt,
			},
			token,
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({
			success: false,
			message: 'Ошибка при регистрации пользователя',
		})
	}
}

export const UserController = {
	register,
}
