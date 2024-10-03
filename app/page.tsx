'use client'

import { doc, collection } from '@firebase/firestore'
import {
	useFirestore,
	useFirestoreCollection,
	useFirestoreDocData,
} from 'reactfire'
import { ScrollShadow } from '@nextui-org/react'

import useWeatherDate from '@/hooks/weather-date'
import Loader from '@/components/loader'
import ErrMsg from '@/components/error'
import Measurement from '@/components/measurement'
import { getLastLogDate } from '@/utils/date'
import { useEffect } from 'react'

export default function Home() {
	const db = useFirestore()
	const { weatherDate, setWeatherDate } = useWeatherDate()
	const loggedDaysRef = collection(db, 'weather')
	const weatherDataRef = doc(loggedDaysRef, weatherDate.toString())

	const { data: loggedDays, status: loggedDaysStatus } =
		useFirestoreCollection(loggedDaysRef)
	const { data: weatherData, status: weatherDataStatus } =
		useFirestoreDocData(weatherDataRef)

	useEffect(() => {
		if (typeof window === 'undefined') return

		window.addEventListener('load', () => {
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('/sw.js')
			}
		})
	}, [])

	if (loggedDaysStatus !== 'success' || weatherDataStatus !== 'success') {
		return <Loader />
	}

	return (
		<div className="flex flex-col">
			{weatherData?.measurements.length > 0 ? (
				<ScrollShadow
					hideScrollBar
					className="flex flex-col items-center gap-4 px-6 py-2 md:flex-row md:py-4"
					orientation={
						window.innerWidth < 768 ? 'vertical' : 'horizontal'
					}
				>
					<Measurement
						icon="thermostat"
						name="airTemperature"
						unit="°C"
						weatherData={weatherData}
					/>
					<Measurement
						icon="humidity_percentage"
						name="relativeHumidity"
						unit="%"
						weatherData={weatherData}
					/>
					<Measurement
						decimals={0}
						icon="compress"
						name="atmosphericPressure"
						unit="hPa"
						weatherData={weatherData}
					/>
					<Measurement
						icon="grass"
						name="groundTemperature"
						unit="°C"
						weatherData={weatherData}
					/>
				</ScrollShadow>
			) : (
				<ErrMsg
					buttons={[
						{
							text: `Go to ${new Date(
								getLastLogDate(loggedDays).toString(),
							).toLocaleDateString([], {
								month: 'short',
								day: 'numeric',
							})}`,
							icon: 'edit_calendar',
							onPress: () =>
								setWeatherDate(getLastLogDate(loggedDays)),
						},
					]}
					text="No data recorded ☹️"
				/>
			)}
		</div>
	)
}
