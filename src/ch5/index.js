import { spider } from './spider';

spider(url, nesting)
    .then(() => console.log('Download complete'))
    .catch(err => console.error(err))