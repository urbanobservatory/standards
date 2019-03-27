# Application programming interface (API)

## Entrypoint

Details to follow.

## Discoverability

Details to follow. Open to ideas for catalogue and discovery services. The current standards and offerings seem poor, such as Hypercat with a broken site and standard that violates HTTP standards.

## Use cases

Details to follow.

## Searching

Details to follow.

## Spatial queries and data

Details to follow.

## Metadata

Details to follow.

## Serialisation

It is imperative that API outputs from all the observatories can be consumed programmatically without requiring bespoke code to cope with each individual observatory.

You **MUST** serialise your API output as JSON-LD, and describe interaction patterns using JSON Schema. Transforming from JSON-LD to RDF or N3 is [relatively trivial](https://gist.github.com/RubenVerborgh/8da43c6d27d4ba0ef67f8bb2af38de36), so it would be prudent for APIs to provide options to perform this transformation on the server.

JSON-LD **SHOULD** be served as a compacted graph by default. Options may be provided for framed or expanded output to ease compatibility with non-LD parsers and libraries. A library such as [jsonld.js](https://github.com/digitalbazaar/jsonld.js) can perform the transformation in both directions, while libraries such as [LDFlex](https://github.com/RubenVerborgh/LDflex) can make linked requests near transparent.

### Relevant standards

* **[JSON Schema](https://json-schema.org/latest/json-schema-core.html)** to constrain the serialised output to the SSN/SOSA standard, for machine-readability. Note that this does not prohibit additional properties. Validation should be performed using a library such as [AJV](https://github.com/epoberezkin/ajv) or its [CLI equivalent](https://www.npmjs.com/package/ajv-cli). 

* **[JSON Hyper-Schema](https://json-schema.org/latest/json-schema-hypermedia.html)** to describe in a machine-readable manner the way that search requests, actuations and links between API responses, beyond implicit links arising from IRIs in linked data (e.g. pagination links). Libraries implementing the full feature set [are rare](https://github.com/mokkabonna/json-hyper-schema) so some ancillary development may be required.

* **[JSON-LD v1.1](https://w3c.github.io/json-ld-syntax/)** to express linked data in JavaScript Object Notation (JSON) form. JSON-LD is described in [this metaschema](https://json-ld.org/schemas/jsonld-schema.json), but an update may be required (to draft-07 or draft-08). Note the [limitations](https://github.com/json-ld/json-ld.org/pull/334#issuecomment-37801678) with respect to JSON Schema and aliasing in the JSON-LD standard; validation tools may not identify all issues. Avoid use of [blanked node identifiers](https://w3c.github.io/json-ld-syntax/#embedding) where possible.

### Ontologies

You **MUST** provide timeseries observations using W3C's Semantic Sensor Network ontology.

You **SHOULD** use existing vocabularies where these are applicable for your sensor networks.

* **[W3C Semantic Sensor Network Ontology](https://www.w3.org/TR/vocab-ssn/)** provides the base from which to describe sensors, observations and actuations. Use of `hasSimpleResult` on `Observation` is discouraged, as units and values are combined; use `Result`. 

<p align="center">
  <img width="80%" src="https://www.w3.org/TR/vocab-ssn/images/SSN-OntStructure-Observation.png">
</p>

* **[Quantities, Units, Dimensions and Types Catalog v1.1](http://www.linkedmodel.org/catalog/qudt/1.1/index.html)** should cover all the units for the sensors we're likely to encounter in this project. Use with `Result` from SSN ontology.

* **[Schema.org](https://schema.org/) and [iot.schema.org](https://iot.schema.org/)** should be used for things such as locations as [latitude](https://schema.org/latitude) and [longitude](https://schema.org/longitude) in WGS84. This may be supplemented with more complex spatial relations if required (e.g. [GeoSPARQL](http://www.opengeospatial.org/standards/geosparql)), but a centroid/mid-point latitude and longitude is considered minimum for each sensor. Some [background information on iot.schema.org](https://iot.schema.org/docs/iot-gettingstarted.html) is worth reading.

### Alignments

You **MAY** consider providing an API serialisation that aligns to other relevant standards.

* **[W3C Web of Things Thing Description](https://www.w3.org/TR/wot-thing-description/)** may be aligned sufficiently with `Sensor` representation per the SSN/SOSA ontologies; to be reviewed once standard is no longer a working draft.

