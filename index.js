'use strict';

const admZip = require('adm-zip');
const request = require('superagent');
const fs = require('fs');

const repoName = 'node-zip-download-sample';
const href = `https://github.com/digitaldrummerj/${repoName}/archive`;
const zipFile = 'master.zip';
const source = `${href}/${zipFile}`;
const extractEntryTo = `${repoName}-master/`;
const outputDir = `./${repoName}-master/`;
console.log('href', href);
console.log('source', source);
console.log('extractEntryTo', extractEntryTo);
console.log('outputDir', outputDir);

request
  .get(source)
  .on('error', function(error) {
    console.log(error);
  })
  .pipe(fs.createWriteStream(zipFile))
  .on('finish', function() {
    console.log('finished dowloading');
    var zip = new admZip(zipFile);
    console.log('start unzip');
    zip.extractEntryTo(extractEntryTo, outputDir, false, true);
    console.log('finished unzip');
  });
