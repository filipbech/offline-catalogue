importScripts("/localforage.min.js");

const CACHENAMES = {
	JS: 'v2',
	IMAGES: 'images-v1'
};

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHENAMES.JS)
			.then(cache => {
				return cache.addAll([
					'/',

					'/inline.bundle.js',
					'/polyfills.bundle.js',
					'/styles.bundle.js',
					'/vendor.bundle.js',
					'/main.bundle.js',

					'/assets/noimage.jpg',
					'/localforage.min.js'
				])
				.then(() => self.skipWaiting());
			})
	);
});	

self.addEventListener('activate',  event => {
	event.waitUntil(Promise.all([self.clients.claim(),
		caches.keys().then(keyList => {
			return Promise.all(keyList.map(function(key) {
				if (Object.values(CACHENAMES).indexOf(key) == -1) {
					return caches.delete(key);
				}
				return true;
			}));
		})
	]));
});


self.addEventListener('sync', function(event) {
	if (event.tag == 'sendOrder') {

		event.waitUntil(fetch('/api/order.json')
			.then(response => {
				return response.json();
			})
			.then(data => {
				return localforage.getItem('order');
			})
			.then(order => {
				const number = order.reduce((acc,pro)=>{return acc+pro.count},0);
				return self.registration.showNotification('Order sent', {
					body: `Your order of ${number} goods was received`
				});
			})
			.catch(err => {
				return Promise.reject('no internet');
			})
		);
	}
});


self.addEventListener('message', (event) => {
	//Later: add other handlers for other messages
	const handler = handleDownloadMessage(event.data.list);

	handler
		.then(() => {
			event.ports[0].postMessage({
				error: null,
				urls: 'Images downloaded'
			});
		}).catch(err => {
			event.ports[0].postMessage({
				error: err
			});
		});
});

self.addEventListener('fetch', event => {
	const url = new URL(event.request.url);

	// Handling images (add to cache as we go, serve offline-image if no cache or network)
	if(url.pathname.indexOf('/assets/') > -1) {
		event.respondWith(
			caches.match(event.request)
				.then(function(response) {
					return response || fetch(event.request).then(response => {
						return caches.open(CACHENAMES.JS).then(cache => {
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

	// handling spa-urls that hasn't been cached (always serving '/');
	if(url.pathname.indexOf('/products/') > -1 || url.pathname.indexOf('/category/') > -1 || url.pathname.indexOf('/basket') > -1) {
		event.respondWith(caches.match('/'));
		return;
	}

	// all other requests should try cache, fallback to network
	event.respondWith(
		caches.match(event.request).then(r => r || fetch(event.request))
	);

});

function handleDownloadMessage(items) {
	return caches.open(CACHENAMES.IMAGES).then(cache => {
		return cache.addAll(items);
	});
}
