// @remove-on-eject-begin
/**
 * Copyright (c) 2019-present, Wentao Li.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({adapter:new Adapter()});

const Dexie = require('dexie');
const indexedDB = require('fake-indexeddb');

Dexie.dependencies.indexedDB = indexedDB;
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');