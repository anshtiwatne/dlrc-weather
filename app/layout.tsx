import '@/styles/globals.css'
import 'react-material-symbols/rounded'
import { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'

import { Providers } from '@/app/providers'
import { FirebaseContextProvider } from '@/config/firebase'
import { Header, Footer } from '@/components/app-bars'
import { WeatherDateContextProvider } from '@/hooks/weather-date'

const poppins = Poppins({
	weight: ['400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'DLRC Weather',
	applicationName: 'DLRC Weather',
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
			<body className={poppins.className}>
				<Providers
					// @ts-ignore
					themeProps={{ attribute: 'class', defaultTheme: 'light' }}
				>
					<FirebaseContextProvider>
						<WeatherDateContextProvider>
							<div className="flex h-dvh flex-col justify-between">
								<Header />
								{children}
								<Footer />
							</div>
						</WeatherDateContextProvider>
					</FirebaseContextProvider>
				</Providers>
			</body>
		</html>
	)
}
