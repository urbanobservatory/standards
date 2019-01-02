# Schema for the RCUK National Urban Observatories

## Context

This document is a **draft** schema recommendation for the observatories. The national programme is required to adopt a degree of unanimity in the way it presents data, to allow either a single entrypoint API, or a capable client, to negotiate data from all the observatory locations, and thereby performing meaningful comparisons and analysis.

## Principles

* Aim for a **five-star approach** per the LGA and Tim Berners-Lee's recommendations, requiring **open data licensing** and **linked data** with supplementary links for context.

* Do not hinder **extensibility**, as far as practicable, to the benefit other domains and unforseen applications. For example:
  * Provenance
  * Control mechanisms and actuation
  * Heirarchy and ontology representing other domain functionality (such as energy networks, CityGML, IFC, etc.)

* Implementation can be by **any available means**, provided the output conforms to the standards detailed here.

* Unified storage or API routing is not required. You should feel free to put each type of sensor **in its own system** provided each system conforms to these standards. This may assist a microservices architecture and reduce complexity. Newcastle University will author libraries to assist with standards-compliant output.

## Standards

* **[JSON Schema](https://json-schema.org/latest/json-schema-core.html)** to constrain the serialised output to the SSN/SOSA standard, for machine-readability. Note that this does not prohibit additional properties. Validation should be performed using a library such as [AJV](https://github.com/epoberezkin/ajv) or its [CLI equivalent](https://www.npmjs.com/package/ajv-cli). 

* **[JSON Hyper-Schema](https://json-schema.org/latest/json-schema-hypermedia.html)** to describe in a machine-readable manner the way that search requests, actuations and links between API responses, beyond implicit links arising from IRIs in linked data (e.g. pagination links). Libraries implementing the full feature set [are rare](https://github.com/mokkabonna/json-hyper-schema) so some ancillary development may be required.

* **[JSON-LD v1.1](https://w3c.github.io/json-ld-syntax/)** to express linked data in JavaScript Object Notation (JSON) form. JSON-LD is described in [this metaschema](https://json-ld.org/schemas/jsonld-schema.json), but an update may be required (to draft-07 or draft-08). Note the [limitations](https://github.com/json-ld/json-ld.org/pull/334#issuecomment-37801678) with respect to JSON Schema and aliasing in the JSON-LD standard; validation tools may not identify all issues. Avoid use of [blanked node identifiers](https://w3c.github.io/json-ld-syntax/#embedding) where possible.

* **[W3C Web of Things Thing Description](https://www.w3.org/TR/wot-thing-description/)** may be aligned sufficiently with `Sensor` representation per the SSN/SOSA ontologies; to be reviewed once standard is no longer a working draft.

## Ontologies

* **[W3C Semantic Sensor Network Ontology](https://www.w3.org/TR/vocab-ssn/)** provides the base from which to describe sensors, observations and actuations. Use of `hasSimpleResult` on `Observation` is discouraged, as units and values are combined; use `Result`. 

<p align="center">
  <img width="80%" src="https://www.w3.org/TR/vocab-ssn/images/SSN-OntStructure-Observation.png">
</p>

* **[Quantities, Units, Dimensions and Types Catalog v1.1](http://www.linkedmodel.org/catalog/qudt/1.1/index.html)** should cover all the units for the sensors we're likely to encounter in this project. Use with `Result` from SSN ontology.

* **[Schema.org](https://schema.org/) and [iot.schema.org](https://iot.schema.org/)** should be used for things such as locations as [latitude](https://schema.org/latitude) and [longitude](https://schema.org/longitude) in WGS84. This may be supplemented with more complex spatial relations if required (e.g. [GeoSPARQL](http://www.opengeospatial.org/standards/geosparql)), but a centroid/mid-point latitude and longitude is considered minimum for each sensor. Some [background information on iot.schema.org](https://iot.schema.org/docs/iot-gettingstarted.html) is worth reading.

## Serialisation

Serialisation as JSON-LD and JSON Schema is the minimum required. Transforming from JSON-LD to RDF or N3 is [relatively trivial](https://gist.github.com/RubenVerborgh/8da43c6d27d4ba0ef67f8bb2af38de36), so it would be prudent for APIs to provide options to perform this transformation on the server.

JSON-LD should be served as a compacted graph by default. Options may be provided for framed or expanded output to ease compatibility with non-LD parsers and libraries. A library such as [jsonld.js](https://github.com/digitalbazaar/jsonld.js) can perform the transformation in both directions, while libraries such as [LDFlex](https://github.com/RubenVerborgh/LDflex) can make linked requests near transparent.

## Discovery

Open to ideas for catalogue and discovery services. The current standards and offerings seem poor, such as Hypercat with a broken site and standard that violates HTTP standards.

## Functionality

Queries, searching, filtering, that sort of thing needs to be thought about. To be completed.

## Examples

Examples to follow properly here. For now, here's a framed copy and paste from the SSN standard.

```json5
{
  "@context": {
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "sosa": "http://www.w3.org/ns/sosa/",
    "ssn": "http://www.w3.org/ns/ssn/",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "qudt": "http://qudt.org/1.1/schema/qudt#",
    "qudt-unit": "http://qudt.org/1.1/vocab/unit#"
  },
  "@graph": [
    {
      "@id": "http://example.org/data/location/4687#windSpeed"
    },
    {
      "@id": "http://example.org/data/observation/147",
      "@type": "sosa:Observation",
      "sosa:hasSimpleResult": {
        "@type": "http://example.org/data/speed",
        "@value": "47 km/h"
      },
      "sosa:madeBySensor": {
        "@id": "http://example.org/data/windSensor/14",
        "@type": "sosa:Sensor",
        "sosa:madeObservation": [
          {
            "@id": "http://example.org/data/observation/148",
            "@type": "sosa:Observation",
            "sosa:hasSimpleResult": {
              "@type": "http://example.org/data/speed",
              "@value": "43 km/h"
            },
            "sosa:madeBySensor": {
              "@id": "http://example.org/data/windSensor/14"
            },
            "sosa:observedProperty": {
              "@id": "http://example.org/data/location/4687#windSpeed"
            },
            "sosa:resultTime": {
              "@type": "xsd:dateTime",
              "@value": "2017-04-12T12:01:00+00:00"
            },
            "ssn:wasOriginatedBy": {
              "@id": "http://example.org/data/observation/148#spinningCupsMovement"
            }
          },
          {
            "@id": "http://example.org/data/observation/147"
          }
        ],
        "sosa:observes": {
          "@id": "http://example.org/data/location/4687#windSpeed"
        },
        "ssn:detects": [
          {
            "@id": "http://example.org/data/observation/148#spinningCupsMovement",
            "@type": "ssn:Stimulus",
            "ssn:isProxyFor": {
              "@id": "http://example.org/data/location/4687#windSpeed"
            }
          },
          {
            "@id": "http://example.org/data/observation/147#spinningCupsMovement"
          }
        ]
      },
      "sosa:observedProperty": {
        "@id": "http://example.org/data/location/4687#windSpeed"
      },
      "sosa:resultTime": {
        "@type": "xsd:dateTime",
        "@value": "2017-04-12T12:00:00+00:00"
      },
      "ssn:wasOriginatedBy": {
        "@id": "http://example.org/data/observation/147#spinningCupsMovement",
        "@type": "ssn:Stimulus",
        "ssn:isProxyFor": {
          "@id": "http://example.org/data/location/4687#windSpeed"
        }
      }
    },
    {
      "@id": "http://example.org/data/observation/147#spinningCupsMovement",
      "@type": "ssn:Stimulus",
      "ssn:isProxyFor": {
        "@id": "http://example.org/data/location/4687#windSpeed"
      }
    },
    {
      "@id": "http://example.org/data/observation/148",
      "@type": "sosa:Observation",
      "sosa:hasSimpleResult": {
        "@type": "http://example.org/data/speed",
        "@value": "43 km/h"
      },
      "sosa:madeBySensor": {
        "@id": "http://example.org/data/windSensor/14",
        "@type": "sosa:Sensor",
        "sosa:madeObservation": [
          {
            "@id": "http://example.org/data/observation/148"
          },
          {
            "@id": "http://example.org/data/observation/147",
            "@type": "sosa:Observation",
            "sosa:hasSimpleResult": {
              "@type": "http://example.org/data/speed",
              "@value": "47 km/h"
            },
            "sosa:madeBySensor": {
              "@id": "http://example.org/data/windSensor/14"
            },
            "sosa:observedProperty": {
              "@id": "http://example.org/data/location/4687#windSpeed"
            },
            "sosa:resultTime": {
              "@type": "xsd:dateTime",
              "@value": "2017-04-12T12:00:00+00:00"
            },
            "ssn:wasOriginatedBy": {
              "@id": "http://example.org/data/observation/147#spinningCupsMovement"
            }
          }
        ],
        "sosa:observes": {
          "@id": "http://example.org/data/location/4687#windSpeed"
        },
        "ssn:detects": [
          {
            "@id": "http://example.org/data/observation/147#spinningCupsMovement",
            "@type": "ssn:Stimulus",
            "ssn:isProxyFor": {
              "@id": "http://example.org/data/location/4687#windSpeed"
            }
          },
          {
            "@id": "http://example.org/data/observation/148#spinningCupsMovement"
          }
        ]
      },
      "sosa:observedProperty": {
        "@id": "http://example.org/data/location/4687#windSpeed"
      },
      "sosa:resultTime": {
        "@type": "xsd:dateTime",
        "@value": "2017-04-12T12:01:00+00:00"
      },
      "ssn:wasOriginatedBy": {
        "@id": "http://example.org/data/observation/148#spinningCupsMovement",
        "@type": "ssn:Stimulus",
        "ssn:isProxyFor": {
          "@id": "http://example.org/data/location/4687#windSpeed"
        }
      }
    },
    {
      "@id": "http://example.org/data/observation/148#spinningCupsMovement",
      "@type": "ssn:Stimulus",
      "ssn:isProxyFor": {
        "@id": "http://example.org/data/location/4687#windSpeed"
      }
    },
    {
      "@id": "http://example.org/data/windSensor/14",
      "@type": "sosa:Sensor",
      "sosa:madeObservation": [
        {
          "@id": "http://example.org/data/observation/148",
          "@type": "sosa:Observation",
          "sosa:hasSimpleResult": {
            "@type": "http://example.org/data/speed",
            "@value": "43 km/h"
          },
          "sosa:madeBySensor": {
            "@id": "http://example.org/data/windSensor/14"
          },
          "sosa:observedProperty": {
            "@id": "http://example.org/data/location/4687#windSpeed"
          },
          "sosa:resultTime": {
            "@type": "xsd:dateTime",
            "@value": "2017-04-12T12:01:00+00:00"
          },
          "ssn:wasOriginatedBy": {
            "@id": "http://example.org/data/observation/148#spinningCupsMovement"
          }
        },
        {
          "@id": "http://example.org/data/observation/147",
          "@type": "sosa:Observation",
          "sosa:hasSimpleResult": {
            "@type": "http://example.org/data/speed",
            "@value": "47 km/h"
          },
          "sosa:madeBySensor": {
            "@id": "http://example.org/data/windSensor/14"
          },
          "sosa:observedProperty": {
            "@id": "http://example.org/data/location/4687#windSpeed"
          },
          "sosa:resultTime": {
            "@type": "xsd:dateTime",
            "@value": "2017-04-12T12:00:00+00:00"
          },
          "ssn:wasOriginatedBy": {
            "@id": "http://example.org/data/observation/147#spinningCupsMovement"
          }
        }
      ],
      "sosa:observes": {
        "@id": "http://example.org/data/location/4687#windSpeed"
      },
      "ssn:detects": [
        {
          "@id": "http://example.org/data/observation/147#spinningCupsMovement",
          "@type": "ssn:Stimulus",
          "ssn:isProxyFor": {
            "@id": "http://example.org/data/location/4687#windSpeed"
          }
        },
        {
          "@id": "http://example.org/data/observation/148#spinningCupsMovement",
          "@type": "ssn:Stimulus",
          "ssn:isProxyFor": {
            "@id": "http://example.org/data/location/4687#windSpeed"
          }
        }
      ]
    }
  ]
}
```
