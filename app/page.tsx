'use client'

import { doc, DocumentData } from '@firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import {
	Card,
	CardBody,
	CardHeader,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ScrollShadow,
	useDisclosure,
} from '@nextui-org/react'
import { MaterialSymbol } from 'react-material-symbols'

import { Loader } from '@/components/loader'
import { keyToTitle } from '@/utils/text'

function Header({ weatherData }: { weatherData: DocumentData }) {
	return (
		<div className="flex w-full items-center justify-between px-4 pt-2">
			<div className="flex items-center gap-2">
				<MaterialSymbol icon="location_on" size={24} />
				<span className="block text-xl md:hidden">DLRC</span>
				<span className="hidden text-xl md:block">
					DLRC, the learning farm
				</span>
			</div>
			<div className="flex items-center gap-2">
				<MaterialSymbol icon="update" size={24} />
				<span className="text-xl">
					<span className="block md:hidden">
						{new Date(
							weatherData.lastMeasurement.seconds * 1000,
						).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</span>
					<span className="hidden md:block">
						{new Date(
							weatherData.lastMeasurement.seconds * 1000,
						).toLocaleString([], {
							weekday: 'long',
							month: 'long',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</span>
				</span>
			</div>
		</div>
	)
}

function Footer() {
	return (
		<div className="flex items-center justify-between pt-2 text-sm text-foreground-600">
			<div className="flex items-center gap-1 font-medium">
				<MaterialSymbol icon="copyright" size={20} />
				<Link
					className="text-sm text-foreground-700 hover:text-blue-600"
					href="https://www.dlrc.in/"
				>
					DLRC Foundation
				</Link>
			</div>
			<div>
				by{' '}
				<Link
					className="text-sm font-medium text-foreground-700 hover:text-blue-600"
					href="https://ansht.com"
				>
					Ansh
				</Link>{' '}
				&{' '}
				<Link
					className="text-sm font-medium text-foreground-700 hover:text-blue-600"
					href=""
				>
					Mr. Tarun
				</Link>
			</div>
		</div>
	)
}

export default function Home() {
	const db = useFirestore()
	const today = new Date().toISOString().split('T')[0]
	const weatherDataRef = doc(db, 'weather', today)
	const { data: weatherData, status: weatherDataStatus } =
		useFirestoreDocData(weatherDataRef)

	if (weatherDataStatus !== 'success') {
		return <Loader />
	}

	const latestMeasurement = weatherData.measurements.reduce(
		(latest: any, current: any) =>
			current.timestamp > latest.timestamp ? current : latest,
		weatherData.measurements[0],
	)

	function Measurement({
		name,
		icon,
		decimals = 2,
		unit,
	}: {
		name: string
		icon: string
		decimals?: number
		unit?: string
	}) {
		const { isOpen, onOpen, onOpenChange } = useDisclosure()

		return (
			<>
				<button
					className="aspect-square min-w-full sm:min-w-80"
					onClick={onOpen}
				>
					<Card className="h-full w-full">
						<CardHeader className="flex w-full items-center justify-center gap-2 pb-0">
							<MaterialSymbol icon={icon as any} size={24} />
							<span className="text-xl">{keyToTitle(name)}</span>
						</CardHeader>
						<CardBody className="flex h-full w-full items-center justify-center pt-0">
							<div className="flex items-center gap-2 text-nowrap text-6xl font-medium text-foreground-800">
								{latestMeasurement[name] ? (
									<>
										<span>
											{latestMeasurement[name].toFixed(
												decimals,
											)}
										</span>
										<span>{unit}</span>
									</>
								) : (
									<span>---</span>
								)}
							</div>
						</CardBody>
					</Card>
				</button>
				<Modal
					isOpen={isOpen}
					scrollBehavior="inside"
					onOpenChange={onOpenChange}
				>
					<ModalContent className="pb-2">
						<ModalHeader className="flex flex-col gap-1">
							{keyToTitle(name)}
						</ModalHeader>
						<ModalBody>
							{weatherData.measurements.map(
								(measurement: any) => (
									// @ts-ignore
									<div key={measurement.timestamp}>
										{measurement[name] && (
											<div className="flex w-full items-center gap-2">
												<span>
													{new Date(
														measurement.timestamp
															.seconds * 1000,
													).toLocaleTimeString([], {
														hour: '2-digit',
														minute: '2-digit',
													})}
												</span>
												<span className="flex-grow border-1 border-dashed" />
												<span>
													{measurement[name].toFixed(
														decimals,
													)}
													{unit}
												</span>
											</div>
										)}
									</div>
								),
							)}
							{weatherData.measurements.every(
								(measurement: any) =>
									measurement[name] === undefined,
							) && 'No data recorded ☹️'}
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		)
	}

	return (
		<div className="flex h-full w-full flex-col gap-2 overflow-hidden p-4">
			<Header weatherData={weatherData} />
			<ScrollShadow
				hideScrollBar
				className="flex h-full w-full flex-grow flex-col items-center gap-4 p-4 md:flex-row"
			>
				<Measurement
					decimals={2}
					icon="thermostat"
					name="airTemperature"
					unit="°C"
				/>
				<Measurement
					decimals={2}
					icon="humidity_percentage"
					name="relativeHumidity"
					unit="%"
				/>
				<Measurement
					decimals={0}
					icon="compress"
					name="atmosphericPressure"
					unit="hPa"
				/>
				<Measurement
					decimals={2}
					icon="grass"
					name="groundTemperature"
					unit="°C"
				/>
			</ScrollShadow>
			<div className="hidden px-2 md:block">
				<Footer />
			</div>
		</div>
	)
}
