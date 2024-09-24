import { parseDate } from '@internationalized/date'
import { DateValue } from '@nextui-org/react'

export function getPreviousDate(currentDate: DateValue) {
	const previousDate = new Date(currentDate.toString())

	previousDate.setDate(previousDate.getDate() - 1)

	return parseDate(previousDate.toISOString().split('T')[0])
}
