'use client'

import { useContext, createContext, useState } from 'react'
import { DateValue } from '@heroui/react'
import { CalendarDate } from '@internationalized/date'

interface WeatherDateProps {
	weatherDate: DateValue
	setWeatherDate: React.Dispatch<React.SetStateAction<DateValue>>
}

const WeatherDateContext = createContext({})

export function WeatherDateContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const today = new Date()
	const [weatherDate, setWeatherDate] = useState<DateValue>(
		new CalendarDate(
			today.getFullYear(),
			today.getMonth() + 1,
			today.getDate(),
		),
	)

	return (
		<WeatherDateContext.Provider value={{ weatherDate, setWeatherDate }}>
			{children}
		</WeatherDateContext.Provider>
	)
}

export default function useWeatherDate() {
	return useContext(WeatherDateContext) as WeatherDateProps
}
