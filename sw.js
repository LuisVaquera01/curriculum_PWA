//asignar el nombre y version de la cache
//constante
const CACHE_NAME="v1_cache_PWA";

//ficheros que se van a estar guardando en la aplicacion que se van a ver offline

var urlsToCache=[
    './',
    './css/style.css',
    './iconos/Logo-VaqueraShop 1024x1024.jpg',
    './iconos/Logo-VaqueraShop 128x128.jpg',
    './iconos/Logo-VaqueraShop 16x16.jpg',
    './iconos/Logo-VaqueraShop 192x192.jpg',
    './iconos/Logo-VaqueraShop 256x256.jpg',
    './iconos/Logo-VaqueraShop 32x32.jpg',
    './iconos/Logo-VaqueraShop 384x384.jpg',
    './iconos/Logo-VaqueraShop 512x512.jpg',
    './iconos/Logo-VaqueraShop 64x64.jpg',
    './iconos/Logo-VaqueraShop.jpg',
    './iconos/Logo-VaqueraShop96x96.jpg'
];

self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
        .then(() =>{
            self.skipWaiting();
        })
        .catch(err => {
            console.log('No se a cargado la cache', err);
        })
    );
});

//no se jjaj

self.addEventListener('activate', e => {
    // añadimos todos los elementos en la cache
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhiteList.indexOf(cacheName) === -1) {
                            // borrar los elementos que ya no estén en
                            // la cache o no se necesiten
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                // Activar cache en el dispositivo
                self.clients.claim();
            })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    // devuelvo datos desde cache
                    return res;
                }
                return fetch(e.request);
            })
    );
});