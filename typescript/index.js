const js2ts = require('json-schema-to-typescript');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const Resolver = require('json-schema-ref-parser');

const resolver = new Resolver();

const resolverOptions = {
  resolve: {
    external: true,
    http: {
      order: 1,
      canRead: true,
      read: (filePath, callback, $refs) => {
        const fileBody = fs.readFileSync(
          path.relative('./', filePath.url)
        );
        callback(null, fileBody.toString());
      }
    }
  },
  dereference: {
    circular: 'ignore'
  }
};

/*
 There is a long-standing issue with json-schema-to-typescript where properties etc.
 are not processed if there is an allOf array or similar. The solution is to move
 these properties to an additional member of the allOf array.

 See https://github.com/bcherny/json-schema-to-typescript/issues/96
 */
const fixOfArrays = (parent, node) => {
  const permittedKeys = ['$schema', '$id', 'id', 'title', 'allOf', 'anyOf', 'oneOf'];

  const keysOnNode = Object
    .keys(node)
    .filter(k => permittedKeys.indexOf(k) < 0);

  if (keysOnNode.length > 0 && (node.anyOf || node.oneOf || node.allOf)) {
    if (node.anyOf) {
      if (node.allOf) {
        node.allOf.push({
          anyOf: node.anyOf
        });
      } else {
        node.allOf = [{
          anyOf: node.anyOf
        }];
      }
      delete node.anyOf;
    }
    if (node.oneOf) {
      if (node.allOf) {
        node.allOf.push({
          oneOf: node.oneOf
        });
      } else {
        node.allOf = [{
          oneOf: node.oneOf
        }];
      }
      delete node.oneOf;
    }
    if (node.allOf) {
      const newAllOfSet = {};
      keysOnNode.forEach(k => {
        newAllOfSet[k] = node[k];
        delete node[k];
      });
      node.allOf.push(newAllOfSet);
    }
  }

  Object
    .keys(node)
    .forEach(k => {
      if (Array.isArray(node[k])) {
        node[k].forEach(a => {
          if (a === undefined) return;
          fixOfArrays(node[k], a);
        });
      }
      if (typeof node[k] === 'object' && node[k] !== null) {
        if (node[k] === undefined) return;
        fixOfArrays(node, node[k]);
      }
    });
};

glob('./../docs/latest/schema/**/*.json', async function (err, files) {
  if (err) {
    console.error(err);
  }
  else {
    // Exclude the JSON-LD file, we don't generate an interface from that
    const fileList = files.filter(f => f.indexOf('JsonLd') < 0);

    for await (const currentFile of fileList) {
      let targetName = path.basename(currentFile).split('.');
      targetName.pop();
      targetName = targetName.join('');
      console.log(`Processing ${targetName} (from ${currentFile})`);

      await resolver.dereference(currentFile, resolverOptions)
        .then((schema) => {
          fixOfArrays(null, schema);
          fs.writeFileSync('./interfaces/' + targetName + '.dereferenced.json', JSON.stringify(schema, null, 2));

          return schema;
        })
        .catch((err) => {
          console.error(`ERROR PROCESSING ${currentFile}`);
          console.error(err);
        })
        .then((schema) => {
          return js2ts
            .compile(schema)
            .then((data) => {
              console.log(`Completed procesing ${targetName}`);
              fs.writeFileSync('./interfaces/' + targetName + '.d.ts', data);
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
  }
});
