'use client'

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
	Image,
	Link,
} from '@nextui-org/react'
import { Roboto_Slab } from 'next/font/google'

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })
const navItems = [
	{ text: 'About', href: '/about' },
	{ text: 'Github', href: 'https://github.com/anshtiwatne/dlrc-weather' },
]

export function Navbar() {
	return (
		<NextUINavbar isBlurred isBordered maxWidth="xl" position="sticky">
			<NavbarBrand as="li">
				<Link
					className="flex items-center justify-start gap-2"
					href="/"
				>
					<Image
						alt="logo"
						fetchPriority="high"
						radius="none"
						src="/favicon.ico"
						width={27.5}
					/>
					<p
						className={`font-black text-foreground-800 ${robotoSlab.className}`}
					>
						DLRC Weather
					</p>
				</Link>
			</NavbarBrand>
			<NavbarContent justify="end">
				{navItems.map((item) => (
					<NavbarItem name={item.href}>
						<Link color="foreground" href={item.href}>
							{item.text}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
		</NextUINavbar>
	)
}
