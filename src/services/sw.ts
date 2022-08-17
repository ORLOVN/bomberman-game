import {NetworkFirst, CacheFirst} from 'workbox-strategies';
import {registerRoute, Route} from 'workbox-routing';
import {precache} from "workbox-precaching";
import {cacheNames} from "workbox-core";

declare const self: ServiceWorkerGlobalScope;

precache(self.__WB_MANIFEST);

const documentFromPrecache = new Route(({request}) => request.destination === 'document', new NetworkFirst({
  cacheName: cacheNames.precache
}));

const resourcesFromPrecache = new Route(({request}) => request.destination !== 'document', new CacheFirst({
  cacheName: cacheNames.precache
}));

const y_apiCache = new Route(({request}) => request.url.includes('/y-api'), new NetworkFirst({
  cacheName: "y-api"
}));

registerRoute(y_apiCache);
registerRoute(documentFromPrecache);
registerRoute(resourcesFromPrecache);
