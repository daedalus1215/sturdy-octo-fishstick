import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent'
import { urlToFilename, getPageLinks } from './util.js';
import { promisfy } from 'util';
import { mkdirp } from 'mkdirp';

const mkdirpPromises = promisfy(mkdirp);

function download(url, filename) {
    console.log(`Downloading ${url}`);
    let content;
    return superagent.get(url)
        .then((res) => {
            content = res.text;
            return mkdirpPromises(dirname(filename))
        })
        .then(() => fsPromises.writeFile(filename, content))
        .then(() => {
            console.log(`Downloaded and saved: ${url}`)
            return content;
        })
}

function spiderLinksVersion2(currentUrl, content, nesting) {
    let promise = Promise.resolve();
    if (nesting === 0) {
        return promise;
    }
    const links = getPageLinks(currentUrl, content);
    for (const link of links) {
        promise = promise.then(() => spider(link, nesting - 1))
    }
    return promise;
}

function spiderLinksVersion3(currentUrl, content, nesting) {
    let promise = Promise.resolve();
    if (nesting === 0) {
        return promise;
    }
    const links = getPageLinks(currentUrl, content);
    return promise.all(links
        .map(() => promise.then(() => spider(link, nesting - 1))));
}

function spider(url, nesting) {
    const filename = urlToFilename(url);
    return fsPromises.readFile(filename, 'utf8')
        .catch((err) => {
            if (err.code !== 'ENOENT') {
                throw err;
            }
            return download(url, filename)
        })
        .then(content => spiderLinksVersion2(url, content, nesting))
}


module.exports = {
    spider
}