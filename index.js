'use strict';

const AdmZip = require('adm-zip');
const request = require('superagent');
const fs = require('fs');
const url = require('url');

const repoName = 'node-zip-download-sample';
const href = 'https://github.com/digitaldrummerj/' + repoName + '/archive';
const zipFile = 'master.zip';
const source = `${href}/${zipFile}`;
const extractEntryTo = `${repoName}-master/`;

const outputDir = './';
const fileName = url
  .parse(source)
  .pathname.split('/')
  .pop();

console.log('href', href);
console.log('source', source);
console.log('extractEntryTo', extractEntryTo);
console.log('outputDir', outputDir);
console.log('fileName', fileName);

request
  .get(source)
  .on('error', function(error) {
    console.log(error);
  })
  .pipe(fs.createWriteStream(zipFile))
  .on('finish', function() {
    console.log('finish');
    var zip = new AdmZip(zipFile);
    zip.extractEntryTo(extractEntryTo, outputDir, false, true);
  });
