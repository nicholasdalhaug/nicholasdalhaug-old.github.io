/* NOTES:
* Consider Workbox for pre-made service workers. 

*/
const staticCacheName = 'site-static';
const staticCacheAssets = [
  '/', 
  '/index.html', 
  '/manifest.json', 
  '/js/app.js', 
  '/js/ui.js', 
  '/css/materialize.min.css', 
  '/js/materialize.min.js', 
  '/css/styles.css', 
  'https://fonts.googleapis.com/icon?family=Material+Icons',
];

// install service worker
self.addEventListener('install', evt => {
  console.log('service worker has been installed');
  
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
//        console.log('caching static assets');
        cache.addAll(staticCacheAssets);
      })
//      .then( () => self.skipWaiting())
  );
  
});

// activate event
self.addEventListener('activate', evt => {
  console.log('service worker has been activated');
  
  evt.waitUntil(
    
    // Remove caches
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames
        .filter(cacheName => cacheName !== staticCacheName)
        .map(cacheName => caches.delete(cacheName))
      )
    })
  );
  
});

// fetch event
self.addEventListener('fetch', evt => {
//  console.log('fetch event', evt);
  evt.respondWith(
    fetch(evt.request)
    .then(response => {
//      console.log('Request: ', evt.request);
      const responseClone = response.clone();
      caches
      .open(staticCacheName)
      .then(cache => {
        cache.put(evt.request, responseClone);
//        console.log('Putting response to cache:', responseClone);
      });
      return response;
    })
    .catch( err => {
//      console.log('Getting content from cache')
      return caches.match(evt.request)
      .then(response => response)
      .catch(err => {
//        console.log('Could not match to cache: ', evt.request);
      });
    })
  );
});
































