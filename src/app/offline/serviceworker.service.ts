import { Injectable } from '@angular/core';

export class ServiceWorkerService {

	public isSupported = 'serviceWorker' in navigator;

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