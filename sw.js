/* NOTES:
* Consider Workbox for pre-made service workers. 

*/
const staticCacheName =   'site-static-v8';
const dynamicCacheName =  'site-dynamic-v8';
//const dynamicCacheSize = 3;
const staticCacheAssets = [
  '/', 
  '/pages/fallback.html', 
  '/index.html', 
  '/manifest.json', 
  '/js/app.js', 
  '/js/ui.js', 
  '/js/db.js', 
  '/css/materialize.min.css', 
  '/js/materialize.min.js', 
  '/css/styles.css', 
  '/img/logo_gears_drawing_192.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/pages/exercises.html', 
  '/js/exercises.js',
];

//// Cahce size limit function
//const limitCacheSize = (name, size) => {
//  caches.open(name).then(cache => {
//    cache.keys().then(keys => {
//      if(keys.length > size){
//        cache.delete(keys[0]).then(limitCacheSize(name, size));
//      }
//    })
//  })
//};

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
  
  if(!evt.request.url.includes('firestore.googleapis.com')){ // Always fetch online requests to google firestore
    
    evt.respondWith(
      
      fetch(evt.request)
      .then(fetchResponse => {
        if( !fetchResponse.ok ) {
          console.log(evt.request);
          console.log(fetchResponse.clone());
          throw Error(fetchResponse.statusText);
        }

        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchResponse.clone());
          return fetchResponse;
        });
      })
      .catch(() => { // 
        if(evt.request.url.indexOf('.html') > -1){
          return caches.match('/pages/fallback.html');
        }
        else { // If it is not html, return the response. Is usable in the case of firestore. 
          return fetch(evt.request);
        }
        
        // caches.match(evt.request).then(cacheResponse
      })
      
    );
    
  }
});

//// fetch event. Working cache first
//self.addEventListener('fetch', evt => {
//  // Do not include requests to google firestore
//  if(!evt.request.url.includes('firestore.googleapis.com')){
//    evt.respondWith(
//      caches.match(evt.request).then(cacheResponse => {
//        return cacheResponse || fetch(evt.request).then(fetchResponse => {
//          if( !fetchResponse.ok ) {
//            throw Error(fetchResponse.statusText);
//          }
//
//          return caches.open(dynamicCacheName).then(cache => {
//            cache.put(evt.request.url, fetchResponse.clone());
//  //          limitCacheSize(dynamicCacheName, dynamicCacheSize);
//            return fetchResponse;
//          });
//        }).catch(() => {
//            if(evt.request.url.indexOf('.html') > -1){
//              return caches.match('/pages/fallback.html');
//            }
//            else { // If it is not html, return the response. Is usable in the case of firestore. 
//              return fetch(evt.request);
//            }
//        })
//      })
//    );
//  }
//});
































