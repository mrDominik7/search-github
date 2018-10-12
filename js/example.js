"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("rxjs/index");
var search = document.getElementById('searchInput'), contentBlock = document.getElementById('content');
var inputEvent$ = index_1.fromEvent(search, 'keyup');
function request() {
    return fetch('https://api.github.com/search/repositories?q=' + search.value)
        .then(function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        response.json().then(function (data) {
            console.log(data.items[0]);
            data.items.forEach(function (item) {
                createElement(item);
            });
        });
    })
        .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}
inputEvent$.subscribe(function (e) {
    setTimeout(function () {
        request();
        console.log(e);
    }, 1000);
});
function createElement(elem) {
    var div = document.createElement('div'), link = document.createElement('a'), searchItem = elem.full_name;
    link.href = elem.clone_url;
    link.innerHTML = searchItem;
    div.className = 'resultBlock';
    div.appendChild(link);
    contentBlock.appendChild(div);
}
//# sourceMappingURL=example.js.map