# Namespace

This namespace is where common terminology and ontology across all of the Urban
Observatories resides.

**Please submit a pull request and allow time for comments if you wish to add a term.**

Terminology that is unique to your institution of a specific sensor network may also be
defined in a local vocabulary.

## Term definitions

New terms *MUST* be added to the `defines` array within the relevant `index.json` document.

Each term *MUST* contain the following properties:

| Key | Description |
| --- | ----------- |
| @id | <p>A unique identifier for the term you are identifying, that will be used by documents authored against the vocabulary.</p><p>It *MUST* begin with the vocabulary file's given prefix.</p><p>Naming convention is that an `rdfs:Class` *SHOULD* begin with an uppercase letter and be specified in `PascalCase`, for example `uo:Collection`, and an `rdf:Property` *SHOULD* begin with a lowercase letter and be specified in `camelCase`, for example `uo:nextPage`.</p> |
| @type | <p>The type of term defined.</p><p>The `@type` *SHOULD* be one of the following:</p><ul><li>[`rdfs:Class`](https://www.w3.org/TR/rdf-schema/#ch_classes) is used to describe an object or resource, and would be referenced in the `@type` key by its instances. This also determines the properties that object is expected to have. Examples of classes include `sosa:Sensor` and `uo:Collection`.</li><li>[`rdfs:Datatype`](https://www.w3.org/TR/rdf-schema/#ch_datatype) for types of data that are not adequately described elsewhere. Examples of data types include `xsd:boolean` and `hydra:Rfc6570Template`.</li><li>[`rdf:Property`](https://www.w3.org/TR/rdf-schema/#ch_property) for properties that are associated with an `rdfs:Class` and could appear as keys on the object. Examples include `sosa:madeBySensor` for observations and `dc:description` for a description of a resource.</li></ul> |
| [term_status](https://www.w3.org/2003/06/sw-vocab-status/note) | <p>A text description that indicates whether the term is suitable for use in production systems or likely to change. It *MUST* be one of:</p><ul><li>`unstable` when the meaning, deployment practices, documentation (or important associated software/services) associated with this term are liable to change arbitrarily at some point in the future. They may not, but stability is not guaranteed. Use with caution.</li><li>`testing` when the meaning, deployment practices, documentation and general understanding of this term are approaching some stability, but changes are still possible due to implementation experience or other unanticipated factors.</li><li>`stable` when the term is relatively stable, and its documentation and meaning are not expected to change substantially.</li><li>`archaic` when term is marked as old-fashioned; although used, it is not considered typical of current best practice and alternative expressions may be preferable.</li></ul> |

In addition, each term *SHOULD* contain the following properties:
| Key | Description |
| --- | ----------- |
| [label](https://www.w3.org/TR/rdf-schema/#ch_label) | <p>The label *MAY* be used to provide a human-readable version of the term. This is often likely to be the same as the `@id` for the term, but without any special casing. It *SHOULD* be specified all lowercase except for proper nouns.</p><p>A good label might be "made by sensor" for the property "madeBySensor".</p> |
| [comment](https://www.w3.org/TR/rdf-schema/#ch_comment) | The comment *MAY* be used to provide a more verbose description of the term. It should be human-readable.</p><p>A good comment might be "A collection of resources that may be viewed through pages or filtered" for `uo:Collection`. |
  
In addition, a term definition for an `rdf:Property` *MUST* include:
| Key | Description |
| --- | ----------- |
| [domain](https://www.w3.org/TR/rdf-schema/#ch_domain) | <p>A reference to an `rdfs:Class` that this property is associated with, and might be expected to be used as a key for.</p><p>For example, a `uo:member` property could have the domain of `uo:Collection`, stating that collections would be expected to contain members.</p><p>Where multiple domains are specified, this indicates that all of the given classes are applicable. Use `schema:domainIncludes` for *one of* relations.</p> |

In addition, a term definition *MAY* include:
| Key | Description |
| --- | ----------- |
| [range](https://www.w3.org/TR/rdf-schema/#ch_range) | <p>A reference to one or more `rdfs:Class`es that an `rdf:Property` might reference. For example, a collection of sensors could have the range `sosa:Sensor`.</p><p>Where multiple ranges are specified, this indicates that all of the given classes are applicable. Use `schema:rangeIncludes` for *one of* relations.</p> |
| [subClassOf](https://www.w3.org/TR/rdf-schema/#ch_range) | <p>All instances of this class are also instances of another class.</p> |
| [subPropertyOf](https://www.w3.org/TR/rdf-schema/#ch_subpropertyof) | <p>All instances of this property are also instances of another property.</p> |
| [seeAlso](https://www.w3.org/TR/rdf-schema/#ch_seealso) | <p>A reference that provides additional information. This does not have to be machine readable, and could for example be a Wikipedia entry or similar.</p> |
| [sameAs](https://www.w3.org/TR/owl-ref/#sameAs-def) | <p>An indication that a resource is referring to exactly the same thing. This is most appropriate for physical things (e.g. a room in a building that exists in two different APIs may be linked this way) rather than conceptual relationships, which may be better described as a sub-class or sub-property.</p> |


## Naming conventions

The following table describes which *case* MUST be used when adding new definitions of a certain type. Note the use of compact IRIs, e.g. using the prefix `uo:`. 

Definition Type | Case | Examples
--- | --- | ---
Class | PascalCase | `uo:Discipline`, `uo:ObservableProperty`, `uo:Collection`
Property | camelCase | `uo:recommendedUnit`, `uo:hasMember`
Instances | kebab-case | `uo:atmospheric-chemistry`, `uo:air-temperature`, `uo:millimetre`, `uo:earth-atmosphere`