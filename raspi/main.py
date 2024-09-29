#!/usr/bin/env python3

import logging
import time
from datetime import date, datetime, timedelta

from firebase_admin import credentials, firestore, initialize_app
from google.cloud.firestore import ArrayUnion

import sensors

service_account_key = {
	"type": "service_account",
	"project_id": "dlrc-weather",
	"private_key_id": "baeadd5765b1843f9f6223b16f3e37293ceef674",
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgCozaa0B9iyZR\nbKc7hX/qhzw0II3on+5swLVKLwsKAivPyezdgOiXc8Ny4cmxxnyfgnzGPeXTY+iP\nXRCqQbn9gFro0gC3LtZtIAaPvbt/yNaJZsiJz4Asi/FAW3OvAUXWymEzDBxIiYrR\n8Isk33fny+3r+NIqbdQaeQLhI7Yt5fyqdp07Uf2v4YGMJe4lInKeRZBOS7MNz5UJ\n7pHscvd8qr0gkAx6GWZzVIde2AYy7V5n9BSkT2faxrNVDYah4zmHZ1l8pbGrYDFx\ncZEcYXABuQXM8QgGLhzWdB/bcEyXZ0uhlKifmsPKzivyqA6C9Z4LYeJvFJRjxX7/\nCdCcUFODAgMBAAECggEAE3fqazDm1x7T73hx3ioURc8OV3eqVk+2QkvYVzONJTo0\nYteOf+I26SLvoLcEwSKDIH2leLwo4WPi83r/vvu13gz813D3Hfw4S21nlEQhXfRs\nMf9rNRB6ksYHTVaSpl8CRD8O6eshjwAO/2ZClvQJnbdPXwhAELdBjmLazdEj+psx\nYqE8y7HRjjHZFEMTp/usOIZrhMoVBLw2WNPLLRUYOCfItbOkIHtogF1A0qghQWzb\nQVh7AJmPhbE4GxNin6g0Ob7oDT06C60oqQ+O3SE8bcM4JTiSNrzEPHjOCPO16E/W\n/fbTVaWCh3VfuVVFFLGV9/rRebDKPy4xs7TsY5LC2QKBgQDKze0hur9YsXHkSsth\nvOkAkUOGH0g9L/wtuJs6URYRMdFKD8zZwEsVj4U6CU5afcJrBcI9arAOHRawKXV7\nUjP6iJPHli4dcG/j9yg2qi5DJ1QknIEoetcaZ8fjABp7/7MKdb64Ag0ooTKEzifn\nhkq/WfNQux1C/tzNlMLuA0h5zwKBgQDKBSB3M5f3h5HAD2UE8HuAiYkTd7yIhKgd\ngPlNfvJVsDPV8PNZTETGMCrCUUz2VlyVUCghy4nVDMvLgG0fEaQNxVJvvXlIT+aP\n60n8vBLSSg40RIwxIOnt2ihqkb6u7cUU6vSxVK/9zEkknt2El4SEy81K96iKdNqf\nF/eGZBicDQKBgQCpwuTLxjHkAW0vxzgmEWcNVYurWsYyiddTQmOV1khdjlD96On2\nIJP5cVD5Os7+yqSSx5hHpuXGeq0CO0IfP7lI70ic2maxt+vBbKOZ1qyxA9vYZbVr\n+B/U96iHqQ+CWpE5oURLbVQsfXr3VkZq9KvfL2GQY4DkEskrwWnGqLLjWwKBgCKO\nIfGBx7q1W77oYzUnFVj1LZdA4eTQHBl/2CTjU/xIOXWc02Mw4oqr7oRyd6GjQA7i\nORsev6LLn4hdnUy1LcSVPfaTCE3QLPXtHyi12tpRhIB4QSqeIKVorYUdDOrLDOz5\nC4XRoJDfApva+LUXXbmBSspJ9nBIcKTJ6rL4KCV5AoGAQ/cDG75fmh5E3C9JD7Ca\nt5yPNQhkLU0Wh/GPzGBnQI5nEaes7/fhICqXJ1CHmr/ZD1E1xM2F5RJSKnLFGgNJ\nIagIPL5MUYTd3ANKgzGOhfu+91ONBlQ+uExXf9lDsb5nej7hpnG3kLn9Ob82Nx+G\nuP9T1YWgxcsRxF3wSBRcKsw=\n-----END PRIVATE KEY-----\n",
	"client_email": "firebase-adminsdk-ry421@dlrc-weather.iam.gserviceaccount.com",
	"client_id": "108776039565406419253",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ry421%40dlrc-weather.iam.gserviceaccount.com",
	"universe_domain": "googleapis.com",
}
cred = credentials.Certificate(service_account_key)
initialize_app(cred)

db = firestore.client()

logging.basicConfig(
	filename="weather_update.log",
	level=logging.INFO,
	format="%(asctime)s - %(levelname)s - %(message)s",
	datefmt="%Y-%m-%d %H:%M:%S",
)


def get_wait_time():
	now = datetime.now()
	minutes_to_add = 15 - (now.minute % 15)

	if minutes_to_add == 15:
		minutes_to_add = 0

	next_interval = (now + timedelta(minutes=minutes_to_add)).replace(
		second=0, microsecond=0
	)

	sleep_duration = (next_interval - now).total_seconds()
	return sleep_duration


def update_weather():
	today = date.today().isoformat()
	bme280_sample = sensors.BME280().get_sample()
	ds18b20_temp = sensors.DS18B20().get_temp()

	db.collection("weather").document(today).set(
		{
			"lastMeasurement": bme280_sample.timestamp,
			"measurements": ArrayUnion(
				[
					{
						"timestamp": bme280_sample.timestamp,
						"airTemperature": bme280_sample.temperature,
						"relativeHumidity": bme280_sample.humidity,
						"atmosphericPressure": bme280_sample.pressure,
						"groundTemperature": ds18b20_temp,
					}
				]
			),
		},
		merge=True,
	)

	logging.info(
		"Weather data updated: Timestamp: %s, Air temperature: %.2f °C, Relative humidity: %.2f %%, Atmospheric pressure: %.2f hPa, Ground temperature: %.2f °C",
		bme280_sample.timestamp,
		bme280_sample.temperature,
		bme280_sample.humidity,
		bme280_sample.pressure,
		ds18b20_temp,
	)


while True:
	try:
		sleep_duration = get_wait_time()

		if sleep_duration > 0:
			logging.info(
				"Sleeping for %.2f seconds to align with the next 15-minute interval",
				sleep_duration,
			)
			time.sleep(sleep_duration)

		update_weather()
		time.sleep(30)

	except Exception as e:
		logging.error("An error occurred: %s", e, exc_info=True)
