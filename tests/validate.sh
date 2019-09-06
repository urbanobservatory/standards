#!/bin/bash

# This is only temporary. Need to put in a proper test runner...

ajv validate \
	-s ../docs/latest/schema/ssn/SensorCollection.json \
	-r '../docs/latest/schema/**/*.json' \
	--json-pointers \
	--errors=text \
	-d '*sensor-collection*.json'
