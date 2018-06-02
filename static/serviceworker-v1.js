'use strict';

(function () {
  'use strict';

  /**
  * Service Worker Toolbox caching
  */

  var cacheVersion = '-toolbox-v1';
  var networkFirstCacheName = 'dynamic-vendor' + cacheVersion;
  var staticAssetsCacheName = 'static-assets' + cacheVersion;
  var contentCacheName = 'content' + cacheVersion;
  var maxEntries = 50;

  self.importScripts('/sw-toolbox.js');

  self.toolbox.options.debug = false;

  // Cache own static assets
  self.toolbox.router.get('/webfonts/(.*)', self.toolbox.cacheFirst, {
    cache: {
      name: staticAssetsCacheName,
      maxEntries: maxEntries
    }
  });

  // Cache all static vendor assets, e.g. fonts whose version is bind to the according url
  self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
    origin: /(fonts\.gstatic\.com|www\.google-analytics\.com)/,
    cache: {
      name: staticAssetsCacheName,
      maxEntries: maxEntries
    }
  });

  self.toolbox.router.get('/(.*)', self.toolbox.networkFirst, {
    cache: {
      name: networkFirstCacheName,
      maxEntries: maxEntries
    }
  });

  self.toolbox.router.get('/*', self.toolbox.networkFirst, {
    cache: {
      name: networkFirstCacheName,
      maxEntries: maxEntries
    }
  });

  // immediately activate this serviceworker
  self.addEventListener('install', function (event) {
    return event.waitUntil(self.skipWaiting());
  });

  self.addEventListener('activate', function (event) {
    return event.waitUntil(self.clients.claim());
  });

})();
//# sourceMappingURL=serviceworker-v1.js.map