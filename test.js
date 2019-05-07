// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: multitenancy
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var pkg = require('./package.json');

if (pkg.main) {
  // will throw and exception if it can't be found
  require.resolve(pkg.main);
}

for (var b in pkg.bin) {
  // will throw and exception if it can't be found
  require.resolve(pkg.bin[b]);
}
