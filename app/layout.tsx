import '@/styles/globals.css'
import 'react-material-symbols/rounded'
import clsx from 'clsx'
import { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'

import { Providers } from '@/app/providers'
import { FirebaseContextProvider } from '@/config/firebase'

const poppins = Poppins({
	weight: ['400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'DLRC Weather',
	applicationName: 'DLRC Daily',
	description: 'Data from the DLRC Weather Station',
	metadataBase: new URL('https://weather.dlrc.in'),
	alternates: {
		canonical: 'https://weather.dlrc.in',
	},
	appleWebApp: true,
	formatDetection: {
		telephone: false,
	},
	other: {
		['darkreader-lock']: 'true',
	},
}

export const viewport: Viewport = {
	userScalable: false,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<head />
			<body className={clsx('min-h-[100dvh]', poppins.className)}>
				<Providers
					themeProps={{ attribute: 'class', defaultTheme: 'light' }}
				>
					<FirebaseContextProvider>
						<div className="relative flex h-[100dvh] flex-col">
							{children}
						</div>
					</FirebaseContextProvider>
				</Providers>
			</body>
		</html>
	)
}
