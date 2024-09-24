import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { MaterialSymbol } from 'react-material-symbols'
import { JetBrains_Mono } from 'next/font/google'
import { DocumentData } from '@firebase/firestore-types'

import { keyToTitle } from '@/utils/text'
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export default function Measurement({
	name,
	icon,
	decimals = 2,
	unit,
	weatherData,
}: {
	name: string
	icon: string
	decimals?: number
	unit?: string
	weatherData: DocumentData
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const latestMeasurement = weatherData?.measurements.reduce(
		(latest: any, current: any) =>
			current.timestamp > latest.timestamp ? current : latest,
		weatherData.measurements[0],
	)

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
											.reduce((min: any, current: any) =>
												current[name] < min[name]
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
											.reduce((max: any, current: any) =>
												current[name] > max[name]
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
									b.timestamp.seconds - a.timestamp.seconds,
							)
							.map((measurement: any) => (
								// @ts-ignore
								<div key={measurement.timestamp}>
									{measurement[name] && (
										<div
											className={`flex w-full items-center gap-2 ${jetBrainsMono.className}`}
										>
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
