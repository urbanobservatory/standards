const mergeDeep = require('merge-deep');
const clone = require('rfdc')();
const util = require('./util');

const schemaPath = '../docs/latest/schema/ssn/SensorCollection.json';

describe('Schema: SensorCollection', () => {
  let ajv = null;
  let schema = null;

  let exampleWithIds = null;
  let exampleWithDetail = null;

  test('should compile', () => {
    ajv = util.loadSchemas('../docs/latest/schema/**/*.json');
    schema = util.loadJson(schemaPath);
    ajv.compile(schema);
  });

  describe('should validate full examples', () => {
    test('collection using IRI references for sensors', () => {
      exampleWithIds = util.loadJson('../examples/ex-sensor-collection-with-ids.json');
      expect(ajv.validate(schema, exampleWithIds)).toBeTruthy();
    });

    test('collection with sensor detail embedded', () => {
      exampleWithDetail = util.loadJson('../examples/ex-sensor-collection-with-detail.json');
      expect(ajv.validate(schema, exampleWithDetail)).toBeTruthy();
    });
  });

  describe('should expand and compact to identical JSON', () => {
    test('collection using IRI references for sensors', async () => {
      const context = exampleWithIds['@context'];
      const expanded = await util.jsonld.expand(exampleWithIds);
      const compacted = await util.jsonld.compact(expanded, context);

      expect(exampleWithIds).toEqual(compacted);
    });

    test('collection with sensor detail embedded', async () => {
      const context = exampleWithDetail['@context'];
      const expanded = await util.jsonld.expand(exampleWithDetail);
      const compacted = await util.jsonld.compact(expanded, context);

      expect(exampleWithDetail).toEqual(compacted);
    });
  });

  describe('Should enforce type on collection members if present', () => {
    test('when type is compacted string', () => {
      const mergedExample = clone(exampleWithDetail);
      mergedExample.member[0]['@type'] = 'Sensor';
      expect(ajv.validate(schema, mergedExample)).toBeTruthy();
      mergedExample.member[0]['@type'] = 'NotASensor';
      expect(ajv.validate(schema, mergedExample)).toBeFalsy();
    });
    test('when type is array', () => {
      const mergedExample = clone(exampleWithDetail);
      mergedExample.member[0]['@type'] = ['Sensor', 'TypeOfSensor'];
      expect(ajv.validate(schema, mergedExample)).toBeTruthy();
      mergedExample.member[0]['@type'] = ['TypeOfSensor'];
      expect(ajv.validate(schema, mergedExample)).toBeFalsy();
    });
  });
});
