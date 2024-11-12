//Service Worker

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./assets/js/sw.js')
    .then(res => console.log('Service worker cargado correctamente'))
    .catch(err => console.error('Error al cargar el service worker', err));

}
else{
    console.log('No se localiza');
};