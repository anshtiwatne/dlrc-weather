import { DocumentData } from '@firebase/firestore-types'
import { parseDate } from '@internationalized/date'

export function getLastLogDate(loggedDays: DocumentData) {
	const daysArray = loggedDays?.docs.map((doc: DocumentData) => doc.id)
	const latestDate = daysArray.reduce((latest: string, current: string) => {
		return new Date(latest) > new Date(current) ? latest : current
	}, daysArray[0])

	return parseDate(new Date(latestDate).toISOString().split('T')[0])
}
