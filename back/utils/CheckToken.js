import jwt from 'jsonwebtoken'

const CheckToken = async (req, res, next) => {
	const token = req.body.token

	if (!token) {
		return res.status(401).json({ message: 'Требуется токен' })
	}

	try {
		const decoded = jwt.verify(token, 'secret')
		next()
	} catch (error) {
		// Если токен не валиден
		res.status(401).json({ message: 'Invalid token' })
	}
}

export default CheckToken
