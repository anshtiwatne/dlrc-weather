#!/usr/bin/env python3

import time
import smbus2
import glob
import bme280


class BME280:
	def __init__(self, bus=smbus2.SMBus(1), address=0x76):
		self.bus = bus
		self.address = address
		self.calibration_params = bme280.load_calibration_params(bus, address)

	def get_sample(self):
		return bme280.sample(self.bus, self.address, self.calibration_params)


class DS18B20:
	def __init__(self):
		self.device_file = glob.glob("/sys/bus/w1/devices/28*")[0] + "/w1_slave"

	def crc_check(self, lines):
		return lines[0].strip()[-3:] == "YES"

	def read_device_file(self):
		with open(self.device_file, "r") as f:
			return f.readlines()

	def parse_temp(self, lines):
		temp_line = lines[1]
		equal_pos = temp_line.find("t=")
		if equal_pos != -1:
			temp_str = temp_line[equal_pos + 2 :]
			return float(temp_str) / 1000

	def get_temp(self):
		attempts = 0

		lines = self.read_device_file()
		success = self.crc_check(lines)

		while not success and attempts < 3:
			time.sleep(0.2)
			lines = self.read_device_file()
			success = self.crc_check(lines)
			attempts += 1
		
		if success:
			return self.parse_temp(lines)
