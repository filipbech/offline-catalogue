import { Injectable } from '@angular/core';

export class ServiceWorkerService {

	public isSupported = 'serviceWorker' in navigator;

	public requestSync(syncName) {
		if(!this.isSupported) {
			throw new ReferenceError('ServiceWorker is not supported in this browser');
		}

		(window as any).Notification.requestPermission(function(result) {
			if(result !== 'granted') {
				alert('instead of a notification you will get an email (you won\'t)');
				return
			}

			(navigator as any).serviceWorker.ready.then(function(swRegistration) {
				return swRegistration.sync.register(syncName);
			});

		});

	}

	public postMessage(message) {

		if(!this.isSupported) {
			throw new ReferenceError('ServiceWorker is not supported in this browser');
		}

		return new Promise(function(resolve, reject) {
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