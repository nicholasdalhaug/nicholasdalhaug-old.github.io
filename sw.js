/* NOTES:
* Consider Workbox for pre-made service workers. 

*/
const staticCacheName = 'site-static-v1';
const staticCacheAssets = [
  '/', 
  '/pages/fallback.html', 
  '/index.html', 
  '/manifest.json', 
  '/js/app.js', 
  '/js/ui.js', 
  '/css/materialize.min.css', 
  '/js/materialize.min.js', 
  '/css/styles.css', 
  'https://fonts.googleapis.com/icon?family=Material+Icons',
];
const dynamicCacheName = 'site-dynamic-v1';

// install service worker
self.addEventListener('install', evt => {
  console.log('service worker has been installed');
  
  evt.waitUntil(
    
    // Cache static assets
    caches
    .open(staticCacheName)
    .then(cache => {
      cache.addAll(staticCacheAssets);
    })
  );
  
});

// activate event
self.addEventListener('activate', evt => {
  console.log('service worker has been activated');
  
  evt.waitUntil(
    
    // Remove unused caches
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames
        .filter(cacheName => cacheName !== staticCacheName && cacheName !== dynamicCacheName)
        .map(cacheName => caches.delete(cacheName))
      )
    })
  );
  
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheResponse => {
      return cacheResponse || fetch(evt.request).then(fetchResponse => {
        if( !fetchResponse.ok ) {
          throw Error(fetchResponse.statusText);
        }
        
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchResponse.clone());
          return fetchResponse;
        });
      }).catch(() => caches.match('/pages/fallback.html'))
    })
    
    
    
    
//    // Cache first, then fetch
//    caches.match(evt.request)
//    .then(cacheResponse => {
//      if( cacheResponse ) {
//        return cacheResponse;
//      }
//      
//      // No such request in cache, do a fetch
////      console.log('No such request stored: ', evt.request);
//      return fetch(evt.request)
//      .then(fetchResponse => {
//        
//        return 
//        caches.open(dynamicCacheName)
//        .then(cache => {
//          cache.put(evt.request.url, fetchResponse.clone());
//          return fetchResponse;
//        });
//      });
//    })
//    .catch( err => {
//      console.log('Cache match gave an error: ', err);
//    })
    
    
    
    
    
    
    
    // Fetch first, then cache
//    fetch(evt.request)
//    .then(response => {
//      const responseClone = response.clone();
//      caches
//      .open(dynamicCacheName)
//      .then(cache => {
//        cache.put(evt.request, responseClone);
////        console.log('Putting response to cache:', responseClone);
//      });
//      return response;
//    })
//    .catch( err => {
////      console.log('Getting content from cache')
//      return caches.match(evt.request)
//      .then(response => response)
//      .catch(err => {
////        console.log('Could not match to cache: ', evt.request);
//      });
//    })
  );
});
































