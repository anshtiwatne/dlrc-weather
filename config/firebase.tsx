'use client'

import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getMessaging, getToken } from 'firebase/messaging'
import {
	FirebaseAppProvider,
	AuthProvider,
	FirestoreProvider,
	useFirebaseApp,
	StorageProvider,
} from 'reactfire'

const firebaseConfig = {
	apiKey: 'AIzaSyAgEFttRhdRXCcaZY22LZmPmoemgZBfojQ',
	authDomain: 'dlrc-weather.firebaseapp.com',
	projectId: 'dlrc-weather',
	storageBucket: 'dlrc-weather.appspot.com',
	messagingSenderId: '880572742716',
	appId: '1:880572742716:web:065e4a4ecddc6930155739',
	measurementId: 'G-W7ZTMKLD8W',
}

export function FirebaseComponents({
	children,
}: {
	children: React.ReactNode
}) {
	const app = useFirebaseApp()
	const auth = getAuth(app)
	const db = getFirestore(app)
	const storage = getStorage(app)

	if (typeof window !== 'undefined') {
		getAnalytics(app)
		getPerformance(app)
		const messaging = getMessaging()

		getToken(messaging, {
			vapidKey:
				'BFELbjfUEw6ySUrsjh2C9tatt4cm3ecoU4wdENXBWlcTwR5vvbdr80HtEe07dWcV86ZOdvb8iUCMawBdeyPtefo',
		})
		// .then((currentToken: any) => {
		// 	if (currentToken) {
		// 		console.log('Current token for client: ', currentToken)
		// 	} else {
		// 		console.log(
		// 			'No registration token available. Request permission to generate one.',
		// 		)
		// 	}
		// })
		// .catch((err: any) => {
		// 	console.log('An error occurred while retrieving token. ', err)
		// })
	}

	return (
		<AuthProvider sdk={auth}>
			<FirestoreProvider sdk={db}>
				<StorageProvider sdk={storage}>{children}</StorageProvider>
			</FirestoreProvider>
		</AuthProvider>
	)
}

export function FirebaseContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<FirebaseComponents>{children}</FirebaseComponents>
		</FirebaseAppProvider>
	)
}
