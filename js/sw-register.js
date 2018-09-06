/**
 * INTIALIZE SERVICE WORKER
 */

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js')
        .then(e => console.log(`Service Worker Initialized: ${e}`))
        .catch(err => console.log(`Error registering SW: ${err}`));

}