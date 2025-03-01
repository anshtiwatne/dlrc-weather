'use client'

import MaterialSymbol from '@/components/material-symbol'
import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

function handleDownload(weatherData: any) {
	const headers = [
		'timestamp',
		'airTemperature',
		'relativeHumidity',
		'atmosphericPressure',
		'groundTemperature',
	]
	const allMeasurements = weatherData.flatMap(
		(item: any) => item.measurements || [],
	)
	console.log(allMeasurements)

	const mappedMeasurements = [headers].concat(
		allMeasurements
			.sort((a: any, b: any) => a.timestamp.seconds - b.timestamp.seconds)
			.map((measurement: any) => {
				return [
					new Date(
						measurement.timestamp.seconds * 1000 +
							measurement.timestamp.nanoseconds / 1000000,
					).toISOString(),
					measurement.airTemperature,
					measurement.relativeHumidity,
					measurement.atmosphericPressure,
					measurement.groundTemperature,
				]
			}),
	)

	const csvContent = mappedMeasurements
		.map((obj) => Object.values(obj).join(','))
		.join('\n')
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')

	link.href = url
	link.download = `measurements.csv`
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

export function CSVDownload() {
	const db = useFirestore()
	const weatherRef = collection(db, 'weather')
	const { data: weatherData, status: weatherDataSatus } =
		useFirestoreCollectionData(weatherRef)

	return (
		<MaterialSymbol
			className="text-foreground-700"
			icon="download"
			size={24}
			onClick={() => {
				if (weatherDataSatus === 'success') {
					handleDownload(weatherData)
				}
			}}
		/>
	)
}
