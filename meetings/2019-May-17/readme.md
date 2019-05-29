# Sensor themes
 * Air quality (Sheffield, Manchester, Newcastle, Bristol)
 * LiDAR and thermal scans from images (Sheffield)
 * Meteorological (Sheffield, Manchester, Newcastle, Birmingham)
 * CCTV imagery, video and stills (Newcastle, Manchester)
 * Energy consumption (Manchester, Newcastle, Bristol)
 * Car parking availability (Manchester, Newcastle)
 * People counters (Manchester, Newcastle)
 * People movement (Bristol, Newcastle)
 * Vehicle counters from road loops (Manchester, Newcastle)
 * ANPR-based journey times and counts (Manchester, Newcastle)
 * Room metrics (temperature, humidity, etc. over Z-wave) (Bristol)
 * Smart buildings (Bristol, Newcastle, Manchester)
 * Water quality and sewer/water network monitoring (Bristol, Newcastle)
 * Structural performance (Bristol, Cranfield)
 * Biodiversity and ecology (Birmingham, Newcastle)
 * Road quality and degradation (Newcastle)
 * Health wearables (Manchester)

# Issues
 * Privacy and data protection with image, thermal and LiDAR data sources
 * Static and mobile sensors
 * Lack of manufacturer data on error bounds
 * Lack of transparency in algorithms and corrections applied by instrument providers
 * Data quality with drift and degradation
 * Sporadic measurements and spikes (e.g. water quality sensors)
 * Concern about opening data of questionable quality
 * APIs aren’t for normal people
 * Need to track usage to justify the work we do
 * Numbers don’t necessarily mean much to people without context, limits, evidence, etc.
 * Sensors that don’t meet the relevant requirements for government use (e.g. MCERTS with air quality)
 * Commitment from local authorities to use cases at an early stage
 * Need to have a long baseline for some data
 * Is it possible to assign an individual DOI to a query
 * Balance between flexibility (e.g. full-fledged SPARQL) and real-world server constraints, HTTP constraints etc. 
 * Results of laboratory analysis (how to receive these and integrate?)
 * Replication and resilience of technical infrastructure, ensuring no data loss
 * How to monitor and record issues such as sensor dropouts or system problems

# Activities
 * Sensor farms, colocation studies (Sheffield)
 * Maintenance regimes (Bristol, Newcastle)
 * Correlation models (Bristol)
 * Computer vision (Newcastle, Sheffield)
 * Toolkit for community groups to use handheld sensors (Newcastle)
 * Sensor gifting to schools for engagement (Birmingham, Newcastle, Bristol)

# Associated data
 * Sensor distance from wall (especially for air quality)
 * Maintenance records 

# Existing technologies used
 * InfluxDB
 * MQTT
 * Timescale
 * Postgres
 * Express
 * NodeJS
 * Python
 * Django

# Use cases
 * Sheffield, digital mirrors. Exchange data with another party and they will build a 3D version of the city. Transferring data when request received every five minutes.
 * Sheffield, air quality. Relating health statistics back to air quality to begin to consider whether any relationships may be evident. Need to provide sensor data with respect to statistical output areas etc.
 * Sheffield, data science. Teaching using real-world data to elucidate the problems with sensors and data, need to clean and validate etc.
 * Newcastle, computer vision. Counting pedestrians and vehicles from still and video feeds for the benefit of traffic management and council activities. Speed estimation. View classification for PTZ camera feeds. Water detection for flood risk management. 
 * Manchester, air quality management. Emphasis on data provenance and calibration. Associating low quality sensors with high quality. Identification of types of particulate matter such as spores, pollen, etc. for the benefit of comparison with health statistics etc. PBA (primary biological aerosols) from samples taken and then analysed in a lab.
 * Bristol, energy management systems. Reducing energy consumption in an intelligent way. Identifying unnecessary energy use. 
 * Bristol, water quality. Harbour management, academic use, and environmental regulation. 
 * Newcastle, community-driven sensing. Sensors requested by the community and installed by the observatory for issues such as air quality, noise and traffic speeds. Data needs to be trustworthy enough for local government to accept as evidence.
 * Newcastle, monitoring interventions. Air quality measures introduced in city centre, need to evaluate efficacy of investments and decisions in mitigating air quality problem.
 * Newcastle, healthy routes to work. Using evidence to inform infrastructure changes, moving the entrances to parks to align best with the census-provided travel to work data.
 * Birmingham, effect of weather on the transport network. Mixture of high resolution and high quality with low quality and low resolution. Error compensation. 

# Existing software stacks

## Bristol
 * Z-wave sensors with open source gateway, KAA platform which can generate SDKs for different languages
 * KAA platform doesn’t have SQL options, so pushing to Kafka
 * Planning to use ElasticSearch used to monitor log files
 * Started with MongoDB but concerns about performance for large timeseries
 * KAA has paid-for managed solution but can also be used for free
 * From Kafka to TimescaleDB
 * Sensors are initialised with location data etc., then only timeseries data and notes
 * RPis slow to compile SDKs
 * Planning to build dashboard with Python
 * Water quality sensors
   * Data transmitted over Bristol’s open wifi
   * Gateway device converting from RS485 to the wifi network
   * MODBUS used to read data from the sensor
   * MQTT used for real-time data
   * InfluxDB used to store data
   * Grafana used to visualise data
   * Deployed using OpenStack into Bristol is Open’s private cloud

## Manchester
 * Triangulum uses proprietary system, now trying to avoid vendor-lock in etc.
 * Looking to use data model based on keywords and tag names
 * HyperCat was used in CityVerve as a catalogue, using triples
 * Looking at Node.JS options for new system
 * NodeJS, React, MongoDB, Express used as the stack
 * LevelDB as a triple store
 * Looking to provide a mechanism through which other providers can push data into the system
 * Backend is already available on GitHub

## Birmingham
 * Cloud-based approach
 * NodeJS code with MongoDB backends and RabbitMQ used to broker data between services
 * Containised solution with Docker
 * MEAN stack with Angular 5+
 * Using joy as a validation library
 * Likely to use InfluxDB or Timescale for the timeseries data, and MongoDB for the sensor information, with IDs used to link between the two
 * Microservices
   * Ingestors/brokerage between systems
   * Packet manager that saves data to DB consistently etc.
   * Websocket
   * REST API
   * QC and persistence checking

## Sheffield
 * Direct access to the database is discouraged
 * Web-based API approach
 * Main parameters are the start time and end time
 * Filters can be supplied, default being obtaining all data
 * CSV, NetCDF and JSON as output formats available
 * Ontologies used to describe the columns
 * Data plotting as PDF
 * Aggregation of all of the data into a largest bucket for performance reasons
 * downloads are bundled as ZIP files with individual files for each site and sensor combination
 * Data requests can include extraction of selected quantities using ontological metadata for its specification
 * Will store mobile sensors in a different database table so the location becomes an additional pair of columns
 * Device and lat/lon are used as a triple column primary key in effect
 * Requests for data are parameterised using city name, lat/lon/radius, bounding box, vicinity to active sites, etc., families of sensors (different qualities etc.)
 * Python used to generate web pages from the database
 * Locations are obscured for private properties for privacy reasons

## Newcastle
 * Two concurrent systems running at present
 * API for the city is using a Django instance
 * API for the USB is using a NodeJS server
 * Portal for the city is served using Django
 * Visualisation for the USB is using WebGL
 * Smaller portals for more specialised data such as radar, CCTV imagery, etc.
 * Bulk requests can also be made programmatically, with a ZIP file response
 * Large requests submitted through portal generate an email when data is ready
