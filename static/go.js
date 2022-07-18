const search = document.getElementById('search')

document.getElementById("searchform").addEventListener("submit", function(e) {
    event.preventDefault()
    go(search.value)
});

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
    return "/corrosion/gateway?url=" + url
    } else if (currentproxy == "Ultraviolet") {
    return __uv$config.prefix + __uv$config.encodeUrl(url)
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