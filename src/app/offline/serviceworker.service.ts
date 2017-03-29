import { Injectable } from '@angular/core';

export class ServiceWorkerService {

	public isSupported = 'serviceWorker' in navigator && !('require' in window);

	public requestSync(syncName) {
		if(!this.isSupported) {
			alert('We need to handle the push-messages in a different way with electron (how do we send basket when offline?)');
			return;
		}

		(window as any).Notification.requestPermission(function(result) {
			if(result !== 'granted') {
				alert('instead of a notification you will get an email (you won\'t)');
				return;
			}

			(navigator as any).serviceWorker.ready.then(function(swRegistration) {
				return swRegistration.sync.register(syncName);
			});

		});

	}

	public postMessage(message) {

		return new Promise(function(resolve, reject) {

			if(!this.isSupported) {
				reject('ServiceWorker is not supported in this browser');
			}

			var messageChannel = new MessageChannel();
			messageChannel.port1.onmessage = function(event) {
				if (event.data.error) {
					reject(event.data.error);
				} else {
					resolve(event.data);
				}
			};
			(navigator as any).serviceWorker.controller.postMessage(message, [messageChannel.port2]);
		});
	}

	constructor() {}

}