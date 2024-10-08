#!/usr/bin/env python3

import logging
import time
from datetime import date, datetime, timedelta
from pathlib import Path

from firebase_admin import credentials, firestore, initialize_app
from google.cloud.firestore import ArrayUnion

import sensors

service_account_key = {} # service account key json
cred = credentials.Certificate(service_account_key)
initialize_app(cred)
db = firestore.client()
log_file = Path(__file__).parent / "main.py"

logging.basicConfig(
	filename=log_file,
	level=logging.INFO,
	format="%(asctime)s - %(levelname)s - %(message)s",
	datefmt="%Y-%m-%d %H:%M:%S",
)


def get_wait_time(interval_minutes=15):
	now = datetime.now()
	next_interval = (
		now + timedelta(minutes=interval_minutes - now.minute % interval_minutes)
	).replace(second=0, microsecond=0)
	return (next_interval - now).total_seconds()


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
		
		logging.info(
			"Sleeping for %.2f seconds to align with the next 15-minute interval",
			sleep_duration,
		)
		time.sleep(sleep_duration)
		
		update_weather()
		time.sleep(5)

	except Exception as e:
		logging.error("An error occurred: %s", e, exc_info=True)
