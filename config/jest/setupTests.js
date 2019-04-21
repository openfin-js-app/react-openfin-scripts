const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({adapter:new Adapter()});

const Dexie = require('dexie');
const indexedDB = require('fake-indexeddb');

Dexie.dependencies.indexedDB = indexedDB;
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');