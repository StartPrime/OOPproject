import jwt from 'jsonwebtoken'
import UserModel from '../db_models/UserModel.js'

const checkAdmin = async (req, res, next) => {
	try {
		const decoded = jwt.verify(req.body.token, 'secret')
		const user = await UserModel.Users.findOne({
			where: { id: decoded.id },
			include: [
				{
					model: UserModel.Roles,
					as: 'userRole',
					where: { role: 'администратор' },
				},
			],
		})

		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Пользователь не найден или не является администратором',
			})
		}

		next()
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Ошибка проверки администратора',
			error: error.message,
		})
	}
}

export default checkAdmin
