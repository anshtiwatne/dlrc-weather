'use client'

import { useEffect, useState } from 'react'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	DatePicker,
} from '@heroui/react'
import MaterialSymbol from '@/components/material-symbol'
import { ThemeSwitch } from '@/components/theme-switch'
import { CSVDownload } from '@/components/csv-download'
import useWeatherDate from '@/hooks/weather-date'

export function Header() {
	const { weatherDate, setWeatherDate } = useWeatherDate()

	return (
		<Navbar maxWidth="full">
			<NavbarBrand>
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
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem className="flex items-center gap-4">
					<CSVDownload />
					<ThemeSwitch />
					<DatePicker
						aria-label="weather date"
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
						value={weatherDate}
						onChange={setWeatherDate as any}
					/>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	)
}

export function Footer() {
	const [isShort, setIsShort] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsShort(window.innerWidth < 768)
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [window.innerWidth])

	return (
		<div className="flex items-center justify-between p-4 px-5 text-sm text-foreground-600">
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
