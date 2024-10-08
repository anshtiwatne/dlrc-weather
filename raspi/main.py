#!/usr/bin/env python3

import logging
import time
from datetime import date, datetime, timedelta
from pathlib import Path

from firebase_admin import credentials, firestore, initialize_app
from google.cloud.firestore import ArrayUnion

import sensors

service_account_key = {}  # service account key json
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


def format_reading(value, fmt="%.2f"):
	if value is None:
		return "null"  # or "null" if you prefer
	return fmt % value


def update_weather():
	today = date.today().isoformat()

	try:
		bme280_sample = sensors.BME280().get_sample()
	except Exception as e:
		logging.error(e)
		bme280_sample = {
			"timestamp": datetime.now(),
			"airTemperature": None,
			"relativeHumidity": None,
			"atmosphericPressure": None,
			"groundTemperature": None,
		}

	try:
		ds18b20_temp = sensors.DS18B20().get_temp()
	except Exception as e:
		logging.error(e)
		ds18b20_temp = None

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
		"Weather data updated: Timestamp: %s, Air temperature: %s °C, Relative humidity: %s %%, Atmospheric pressure: %s hPa, Ground temperature: %s °C",
		bme280_sample.timestamp,
		format_reading(bme280_sample.temperature),
		format_reading(bme280_sample.humidity),
		format_reading(bme280_sample.pressure),
		format_reading(ds18b20_temp),
	)

	logging.info(
		"Weather data updated: Timestamp: %s, Air temperature: %.2f °C, Relative humidity: %.2f %%, Atmospheric pressure: %.2f hPa, Ground temperature: %.2f °C",
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
