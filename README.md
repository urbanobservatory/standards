# Standards for the RCUK National Urban Observatories

## Context

This document is a **draft** set of standards and recommendations for the observatories. The national programme **MUST** adopt a degree of unanimity in the way it presents data, to allow either a single entrypoint API, or a capable client, to negotiate data from all the observatory locations, and thereby performing meaningful comparisons and analysis.

## Principles

* Aim for a **five-star approach** per the LGA and Tim Berners-Lee's recommendations, and accordingly the systems **MUST** provide **open data licensing** and **linked data** with supplementary links for context.

* You should not hinder **extensibility**, as far as practicable, to the benefit other domains and unforseen applications. For example:
  * Provenance
  * Control mechanisms and actuation
  * Heirarchy and ontology representing other domain functionality (such as energy networks, CityGML, IFC, etc.)

* Implementation can be by **any available means**, provided the output conforms to the requirements including an obligation expressed as something you **MUST** adhere to.

* Unified storage or consistency in API routing is not required. You should feel free to put each type of sensor **in its own system** provided each system conforms to these standards, provided all elements of the system provide reciprocal links to facilitate discovery. This may assist a microservices architecture and reduce complexity. Newcastle University will author libraries to assist with standards-compliant output.

## Standards

|  Document      | Scope |
|----------------|-------|
| [SOA](soa/README.md)            | _Service-oriented architecture recommendations, which are advisory only_<br><br>Adapters and brokerage<br>Receivers and queues<br>Archival<br>Discovery and descriptors (API)<br>Context|
| [API](api/README.md)            | _Programmatic methods for accessing and interrogating the data, some of which are mandatory_<br><br>Entrypoints<br>Discoverability<br>Use cases<br>Searching<br>Spatial queries<br>Metadata<br>Serialisation<br>&nbsp;&nbsp;Linked data<br>&nbsp;&nbsp;Alignments<br>&nbsp;&nbsp;Ontologies and vocabularies |
| [Domains](domains/README.md)        | _For application-specific domains shared by multiple observatories, e.g. air quality, weather stations_<br><br>Including<br>&nbsp;&nbsp;Instrument calibration<br>&nbsp;&nbsp;Sampling<br>&nbsp;&nbsp;Methods of analysis |
