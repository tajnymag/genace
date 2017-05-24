'use strict';

let AKTUALNI_VERZE = "0.1.0";
let PRISTI_VERZE = "0.1.1";

this.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(AKTUALNI_VERZE).then(function (cache) {
			return cache.addAll([
				'/genace/',
				'/genace/index.html',
				'/genace/js/appka.js',
				'/genace/js/prvky.js',
				'/genace/css/styl.css',
				'/genace/manifest.json',
				'/genace/vendor/vue.min.js',
				'/genace/vendor/vue-material.js',
				'/genace/vendor/vue-material.css',
				'/genace/img/sipka_DOWN.svg',
				'/genace/img/sipka_UP.svg',
				'/genace/img/sipka_LEFT.svg',
				'/genace/img/sipka_RIGHT.svg',
				'/genace/img/menu.svg',
				'/genace/img/seznam.svg',
				'/genace/img/smery.svg'
			]);
		})
	);
});

this.addEventListener('activate', function (event) {
	var cacheWhitelist = [PRISTI_VERZE];

	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (cacheWhitelist.indexOf(key) === -1) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(AKTUALNI_VERZE).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
});