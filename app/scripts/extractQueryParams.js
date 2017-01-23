function extractQueryParams() {
    var match,
        search = /([^&=]+)=?([^&]*)/g,
        query = window.location.search.substring(1),
        routeParams = {};
    while (match = search.exec(query)) {
        routeParams[decode(match[1])] = decode(match[2]);
    }
    return routeParams;

    function decode(s) {
        var plus = /\+/g;
        return decodeURIComponent(s.replace(plus, " "));
    }
}

