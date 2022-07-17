const search = document.getElementById('search')
search.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        go(search.value)
    }
})

var corrosionproxy = window.location.protocol + "//" + window.location.hostname + "/corrosion/gateway?url="
    
var ultravioletproxy = window.location.protocol + "//" + window.location.hostname + __uv$config.prefix
    
    if ('serviceWorker' in navigator) {
        window.navigator.serviceWorker.register('./uv.sw-handler.js', {scope: '/'})
    }


    function pxyopen(url) {
    if (localStorage.getItem("proxy") !== null) {
    window.location.replace(getproxy(url));
    }
    }
    
    function getproxy(url) {
    var currentproxy = localStorage.getItem("proxy")
    if (currentproxy == "Corrosion") {
    return corrosionproxy + url
    } else if (currentproxy == "Ultraviolet") {
    return ultravioletproxy + __uv$config.encodeUrl(url)
    }
    }
    
    function go(url) {
    if (url !== '') {
    if (url.includes('.')) {
    pxyopen(url)
    } else if (url.startsWith('https://')) {
    pxyopen(url)
    } else if (url.startsWith('http://')) {
    pxyopen(url)
    }
    } else {
    return false;
    }
    }