import { body } from 'express-validator'

export const registerValidation = [
	body('email', 'Неверный формат почты').optional().isEmail(),
	body('passwordHash', 'Пароль должен быть минимум 5 символов').isLength({
		min: 5,
	}),
	body('name', 'Имя не должно быть пустым').notEmpty(),
	body('name', 'Неверная длинна').isLength({ min: 2, max: 35 }),
	body('surname', 'Фамилия не должна быть пустой').notEmpty(),
	body('surname', 'Неверная длинна').isLength({ min: 2, max: 35 }),
	body('phone', 'Неверный формат телефона').optional().isMobilePhone('any'),
]
