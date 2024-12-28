import AnimalModel from '../db_models/AnimalModel.js'
import ApplicationModel from '../db_models/ApplicationsModel.js'
import sequelize from '../db.js'

class ReportController {
	async AdoptionStatistics(req, res) {
		try {
			const result = await sequelize.query(`
                 SELECT
                    COUNT(*) AS total_applications,
                    COUNT(*) FILTER (WHERE status = 'одобрена') AS approved_applications,
                    COUNT(*) FILTER (WHERE status = 'отклонена') AS rejected_applications,
                    (SELECT COUNT(*) FROM animals WHERE status = 'в приюте') AS animals_in_shelter_count,
                    (SELECT COUNT(*) FROM animals WHERE status = 'в семье') AS animals_in_family_count,
                    CASE
                    WHEN COUNT(*) > 0 THEN
                    ROUND(COUNT(*) FILTER (WHERE status = 'одобрена') * 100.0 / COUNT(*), 2)
                    ELSE 0
                    END AS acceptance_rate,
                    CASE
                    WHEN COUNT(*) > 0 THEN
                    ROUND(COUNT(*) FILTER (WHERE status = 'отклонена') * 100.0 / COUNT(*), 2)
                    ELSE 0
                    END AS rejection_rate
                    FROM
                    applications;
            `)
			res.status(200).json({
				success: true,
				data: result[0][0],
			})
		} catch (error) {
			console.error(error)
			res.status(500).json({
				success: false,
				message: 'Ошибка при получении статистики усыновлений',
			})
		}
	}

	async UserActivityStatistics(req, res) {
		try {
			const result = await sequelize.query(`
                SELECT 
                    u.id AS id,
                    u.name,
                    u.surname,
                    u.phone,
                    COUNT(a.id) AS total_applications,
                    MAX(a.created_at) AS last_application_date,
                    an.name AS animal_name,
                    an.type AS animal_type,
                    an.breed AS animal_breed,
                    an.photo AS animal_photo
                FROM users u
                LEFT JOIN applications a ON u.id = a.id AND a.createdAt >= NOW() - INTERVAL '30 days'
                LEFT JOIN animals an ON a.animal_id = an.id
                GROUP BY u.id, an.id
                ORDER BY u.id
            `)

			res.status(200).json({
				success: true,
				data: result[0],
			})
		} catch (error) {
			console.error(error)
			res.status(500).json({
				success: false,
				message: 'Ошибка при получении статистики активностей пользователей',
			})
		}
	}
}

export const reportController = new ReportController()
