// Create Cache
const urlsToCache = [
    '/',
    '/js/main.js',
    '/js/dbhelper.js',
    '/css/styles.css',
    '/css/style-small.css',
    'restaurant.html'
];

// upon install, fill cache by fetching urlsToCache (above)
self.addEventListener('install', e => {
    e.waitUntil(caches.open('restaurant_cache_1')
        .then(myCache => {
            console.log('Cache Created... caches urls');
            return myCache.addAll(urlsToCache);

        })
        .catch(err => console.log(`Error initializing cache: ${err}`))
    );
});

// Respond from cache first
self.addEventListener('fetch', function (e) {
    // console.log(`FETCH REQUEST FIRED!: ${e.request}`);

    e.respondWith(
        //check the cache for matchin requests
        caches.match(e.request.url)
        .then(function (response) {
            // if found in cache, return good (cached) response
            if (response) {
                return response;
            }
            // otherwise, get a good response, cache and return it
            else {
                return fetch(e.request)
                    .then(response => {
                        // don't store jpg's -- too large! 102mb limit on cache
                        if (e.request.url.includes('.jpg') == false) {
                            // clone response object
                            let clonedResponse = response.clone();
                            // cache that cloned response object
                            caches.open('restaurant_cache_1')
                                .then(myCache => myCache.put(e.request.url, clonedResponse))
                                .catch(error => console.log(`error caching fetch: ${error}`));
                            // finally, return the good response
                        }

                        return response;
                    })
                    .catch(err => console.log(`Error fetching from network: ${err}`));
            }

        })
    );
});


// 1st version (that worked):

// // Create Cache
// const urlsToCache = [
//     '/',
//     '/js/main.js',
//     '/js/dbhelper.js',
//     '/css/styles.css',
//     '/css/style-small.css',
//     'restaurant.html'
// ];

// self.addEventListener('install', e => {
//     e.waitUntil(caches.open('restaurant_cache_1')
//         .then(myCache => {
//             console.log('Cache Created... caches urls');
//             return myCache.addAll(urlsToCache);

//         })
//         .catch(err => console.log(`Error initializing cache: ${err}`))
//     );
// });

// // Cache all responses
// self.addEventListener('fetch', function (e) {
//     console.log(`FETCH REQUEST FIRED!: ${e.request}`);

//     e.respondWith(
//         caches.match(e.request)
//         .then(function (response) {
//             // console.log(`Fetch request caught, cache response: ${response}`);
//             return response || fetch(e.request);
//         })
//         .then(goodResponse => {
//             let clone = goodResponse.clone();
//             caches.open('restaurant_cache_1').then(myCache => myCache.put(e.request.url, clone));
//             return goodResponse;
//         })
//     );
// });