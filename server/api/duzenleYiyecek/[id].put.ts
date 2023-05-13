import mysql from "mysql"

type Body = {
	yiyecekId: number
	yiyecekAd: string
	yiyecekFiyat: number
	yiyecekTur: string
	yiyecekFotograf: number
}

export default defineEventHandler(async event => {
	const body: Body = await readBody(event)
	const connection: mysql.Connection = event.context.connection

	try {
		const yiyecek = await updateYiyecek(connection, body) as number

		return yiyecek
	} catch (error) {
		console.error(error)

		throw new Error("Yiyecek güncellenemedi")
	}
})

function updateYiyecek(connection: mysql.Connection, body: Body) {
	return new Promise((resolve, reject) => {
		connection.query("USE Restoran", error => {
			if (error) throw error
			console.log("Veri tabanı kullanıldı")

			connection.query(`UPDATE Yiyecek SET ad = '${body.yiyecekAd}', fiyat = ${body.yiyecekFiyat}, tur_id = (SELECT yiyecektur_id FROM YiyecekTur WHERE ad = '${body.yiyecekTur}'), fotograf = '${body.yiyecekFotograf}' WHERE yiyecek_id = ${body.yiyecekId}`
				, (error, results) => {
					if (error) reject(error)
					console.log("Yiyecek güncellendi")
					resolve(results.affectedRows)
				})
		})
	})
}

