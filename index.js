'use strict';

var AdmZip = require('adm-zip');
var request = require('superagent');
var url = require('url');


cosnt repoName = 'node-zip-download-sample';
const url = `https://github.com/digitaldrummerj/${repoName}`;
const zipFile = 'master.zip'
let source = `${url}/${zipFile}`;
var extractEntryTo = `${repoName}-master/`;

var fileName = url.parse(source).pathname.split('/').pop();
var outputDir = `./${repoName}-extracted`;
request.get(source)
    .pipe(fs.createWriteStream(fileName))
    .on('finish', function () {
        var zip = new AdmZip(fileName);
        zip.extractEntryTo(extractEntryTo, outputDir, false, true);
    });

