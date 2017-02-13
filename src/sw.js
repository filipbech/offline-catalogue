const CACHENAME = 'v1'

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHENAME)
			.then(cache => {
				return cache.addAll([
					'/',
					'/inline.bundle.js',
					'/polyfills.bundle.js',
					'/styles.bundle.js',
					'/vendor.bundle.js',
					'/main.bundle.js',
					'/assets/noimage.jpg'
				])
				.then(() => self.skipWaiting());
			})
	);
});	


self.addEventListener('activate',  event => {
	event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
	const url = new URL(event.request.url);

	// Handling images (add to cache as we go, serve offline-image if no cache or network)
	if(url.pathname.indexOf('/assets/') > -1) {
		event.respondWith(
			caches.match(event.request)
				.then(function(response) {
					return response || fetch(event.request).then(response => {
						return caches.open(CACHENAME).then(cache => {
							cache.put(event.request, response.clone());
							return response;
						});
					});
				}).catch(function() {
					return caches.match('/assets/noimage.jpg');
				})
			);

		return;
	}

	// handling spa-urls (always serving '/');
	if(url.pathname.indexOf('/products/') > -1 || url.pathname.indexOf('/category/') > -1) {
		event.respondWith(caches.match('/'));
		return;
	}

	// all other requests should try cache, fallback to network
	event.respondWith(
		caches.match(event.request).then(r => r || fetch(event.request))
	);

});

