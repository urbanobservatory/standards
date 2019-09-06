const Ajv = require('ajv');
const fs = require('fs');
const glob = require('glob');
const jsonld = require('jsonld');

function getFiles(patterns) {
  let files = [];
  if (Array.isArray(patterns)) patterns.forEach(_getFiles);
  else _getFiles(patterns);
  return files;

  function _getFiles(fileOrPattern) {
    if (glob.hasMagic(fileOrPattern)) {
      const dataFiles = glob.sync(fileOrPattern, { cwd: process.cwd() });
      files = files.concat(dataFiles);
    } else {
      files.push(fileOrPattern);
    }
  }
}

function loadJson(path) {
  return JSON.parse(fs.readFileSync(path));
}

function loadSchemas(patterns) {
  const ajv = new Ajv({
    allErrors: true
  });

  let invalid = false;
  const files = getFiles(patterns);

  files.forEach(function (file) {
    const schema = JSON.parse(fs.readFileSync(file));
    try { ajv.addSchema(schema); }
    catch (err) {
      console.error(file, 'is invalid');
      console.error('error:', err.message);
      invalid = true;
    }
  });

  if (invalid) throw new Error('One or more schemas invalid.');

  // Monkey patch the validate method to generate better error reports
  ajv.validateReal = ajv.validate;
  ajv.validate = extractErrors;
  return ajv;
}

function extractErrors(schema, document) {
  const valid = this.validateReal(schema, document);
  const errorMessage = (this.errors || []).map(error => {
    try {
      const [, index, fieldName] = /\[(.*)\].(.*)/.exec(error.dataPath);
      return `error with item #${index}'s field "${fieldName}". The error is: ${error.message}`;
    } catch (error) {
      return error.message;
    }
  }).join('\n');

  if (errorMessage && errorMessage.length) {
    console.error(errorMessage);
  }

  return valid;
}

const nodeDocumentLoader = jsonld.documentLoaders.node();
jsonld.documentLoader = (url, callback) => {
  if(url.indexOf('//') < 0) {
    return callback(
      null, {
        contextUrl: null,
        document: JSON.parse(fs.readFileSync(`../docs/${url}`)),
        documentUrl: url
      });
  }
  nodeDocumentLoader(url, callback);
};

module.exports = {
  loadSchemas,
  loadJson,
  jsonld
};

