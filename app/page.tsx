'use client'

import { doc } from '@firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	DatePicker,
	DateValue,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ScrollShadow,
	useDisclosure,
} from '@nextui-org/react'
import { parseDate } from '@internationalized/date'
import { MaterialSymbol } from 'react-material-symbols'
import { useState } from 'react'

import { Loader } from '@/components/loader'
import { keyToTitle } from '@/utils/text'
import { ErrMsg } from '@/components/error'
import { ThemeSwitch } from '@/components/theme-switch'

function Footer({ isShort = false }: { isShort?: boolean }) {
	return (
		<div className="flex items-center justify-between text-sm text-foreground-600">
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
					{isShort ? 'Ansh' : 'Ansh Tiwatne'}
				</Link>{' '}
				&{' '}
				<span className="text-sm font-medium text-foreground-700">
					Mr. Tarun
				</span>
			</div>
		</div>
	)
}

export default function Home() {
	const db = useFirestore()
	const [date, setDate] = useState<DateValue>(
		parseDate(new Date().toISOString().split('T')[0]),
	)
	const weatherDataRef = doc(db, 'weather', date.toString())
	const { data: weatherData, status: weatherDataStatus } =
		useFirestoreDocData(weatherDataRef)

	if (weatherDataStatus !== 'success') {
		return <Loader />
	}

	const latestMeasurement = weatherData?.measurements.reduce(
		(latest: any, current: any) =>
			current.timestamp > latest.timestamp ? current : latest,
		weatherData.measurements[0],
	)

	function Header() {
		return (
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2">
					<MaterialSymbol
						className="text-foreground-700"
						icon="location_on"
						size={24}
					/>
					<Link
						className="text-xl text-foreground-700 hover:text-blue-600"
						href="https://maps.app.goo.gl/nhkRUvDHx26tuS6U9"
					>
						<span className="block md:hidden">DLRC</span>
						<span className="hidden md:block">
							DLRC, Pashan - Sus Rd, Pune
						</span>
					</Link>
				</div>
				<div className="flex items-center gap-4 md:gap-4">
					<ThemeSwitch />
					<DatePicker
						classNames={{
							selectorIcon: 'text-foreground-700',
						}}
						selectorIcon={
							<MaterialSymbol
								// className="text-foreground-700"
								icon="edit_calendar"
								size={24}
							/>
						}
						value={date}
						onChange={setDate}
					/>
				</div>
			</div>
		)
	}

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
						<CardHeader className="flex w-full items-center justify-center gap-2 pt-4">
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
										<span className="text-foreground-600">
											{unit}
										</span>
									</>
								) : (
									<span>---</span>
								)}
							</div>
						</CardBody>
						<CardFooter>
							{latestMeasurement[name] && (
								<div className="flex w-full justify-between px-4 pb-2 text-lg">
									<div>
										Min:{' '}
										<span className="font-medium">
											{weatherData.measurements
												.reduce(
													(min: any, current: any) =>
														current[name] <
														min[name]
															? current
															: min,
												)
												[name]?.toFixed(decimals)}
										</span>
									</div>
									<div>
										Max:{' '}
										<span className="font-medium">
											{weatherData.measurements
												.reduce(
													(max: any, current: any) =>
														current[name] >
														max[name]
															? current
															: max,
												)
												[name]?.toFixed(decimals)}
										</span>
									</div>
								</div>
							)}
						</CardFooter>
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
							{weatherData.measurements
								.sort(
									(a: any, b: any) =>
										b.timestamp.seconds -
										a.timestamp.seconds,
								)
								.map((measurement: any) => (
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
													)}{' '}
													{unit}
												</span>
											</div>
										)}
									</div>
								))}
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

	function getPreviousDate() {
		const currentDate = new Date(date.toString())
		const previousDate = new Date(currentDate)

		previousDate.setDate(currentDate.getDate() - 1)

		return parseDate(previousDate.toISOString().split('T')[0])
	}

	return (
		<div className="flex h-full w-full flex-col">
			<div className="mb-2 px-6 pt-4">
				<Header />
			</div>
			{weatherData?.measurements.length > 0 ? (
				<ScrollShadow
					hideScrollBar
					className="flex h-full w-full flex-grow flex-col items-center gap-4 px-6 py-2 md:flex-row"
					orientation={
						window.innerWidth < 768 ? 'vertical' : 'horizontal'
					}
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
					<div className="mb-[-1rem] mt-2 w-full pb-4 md:hidden">
						<Footer isShort={true} />
					</div>
				</ScrollShadow>
			) : (
				<ErrMsg
					buttons={[
						{
							text: `Check ${new Date(
								getPreviousDate().toString(),
							).toLocaleDateString([], {
								month: 'short',
								day: 'numeric',
							})}`,
							icon: 'edit_calendar',
							onPress: () => setDate(getPreviousDate()),
						},
					]}
					text="No data recorded ☹️"
				/>
			)}
			<div className="mt-2 hidden px-6 pb-4 md:block">
				<Footer />
			</div>
		</div>
	)
}
