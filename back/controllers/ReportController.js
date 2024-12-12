import AnimalModel from '../db_models/AnimalModel.js'
import ApplicationModel from '../db_models/ApplicationsModel.js'
import sequelize from '../db.js'

const AdoptionStatistics = async (req, res) => {
	try {
		const result = await sequelize.query(`
            SELECT 
                (SELECT COUNT(*) FROM applications) AS total_applications,
                (SELECT COUNT(*) FROM applications WHERE status = 'одобрена') AS approved_applications,
                (SELECT COUNT(*) FROM applications WHERE status = 'отклонена') AS rejected_applications,
                (SELECT COUNT(*) FROM animals WHERE status = 'в приюте') AS animals_in_shelter_count,
                (SELECT COUNT(*) FROM applications WHERE status = 'одобрена') AS animals_in_family_count,
                CASE 
                    WHEN (SELECT COUNT(*) FROM applications) > 0 THEN 
                        ROUND((SELECT COUNT(*) FROM applications WHERE status = 'одобрена') * 100.0 / (SELECT COUNT(*) FROM applications), 2)
                    ELSE 0 
                END AS acceptance_rate,
                CASE 
                    WHEN (SELECT COUNT(*) FROM applications) > 0 THEN 
                        ROUND((SELECT COUNT(*) FROM applications WHERE status = 'отклонена') * 100.0 / (SELECT COUNT(*) FROM applications), 2)
                    ELSE 0 
                END AS rejection_rate
        `)
		res.status(200).json({
			success: true,
			data: result[0][0],
		})

		// const totalApplications = await ApplicationModel.Applications.count()

		// const approvedApplications = await ApplicationModel.Applications.count({
		// 	where: { status: 'одобрена' },
		// })

		// const rejectedApplications = await ApplicationModel.Applications.count({
		// 	where: { status: 'отклонена' },
		// })

		// const animalsInShelterCount = await AnimalModel.Animals.count({
		// 	where: { status: 'в приюте' },
		// })

		// const animalsInFamilyCount = approvedApplications // Это количество одобренных заявок

		// const acceptanceRate =
		// 	totalApplications > 0
		// 		? ((approvedApplications / totalApplications) * 100).toFixed(2)
		// 		: 0
		// const rejectionRate =
		// 	totalApplications > 0
		// 		? ((rejectedApplications / totalApplications) * 100).toFixed(2)
		// 		: 0

		// const report = {
		// 	totalApplications,
		// 	approvedApplications,
		// 	rejectedApplications,
		// 	animalsInShelterCount,
		// 	animalsInFamilyCount,
		// 	acceptanceRate,
		// 	rejectionRate,
		// }

		// res.status(200).json({
		// 	success: true,
		// 	data: report,
		// })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: 'Ошибка при получении статистики усыновлений',
		})
	}
}

const UserActivityStatistics = async (req, res) => {
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

const ReportController = {
	AdoptionStatistics,
	UserActivityStatistics,
}

export default ReportController
