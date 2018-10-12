import {fromEvent} from "rxjs/index";

const search = document.getElementById('searchInput') as HTMLInputElement,
    contentBlock = document.getElementById('content') as HTMLDivElement;
// but = document.getElementById('but') as HTMLButtonElement;

const inputEvent$ = fromEvent(document, 'keyup');

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
                    data.items.forEach(function (item: string) {
                        createElement(item);
                    })
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        })
}

// but.addEventListener('click', function () {
//     contentBlock.innerHTML = '';
//     request();
// });


inputEvent$.subscribe(function (e) {
    setTimeout(() => {
        request();
        console.log(e);
    },1000)
});


function createElement(elem: any) {
    let div = document.createElement('div'),
        link = document.createElement('a'),
        searchItem = elem.full_name;

    link.href = elem.clone_url;
    link.innerHTML = searchItem;
    div.className = 'resultBlock';

    div.appendChild(link);
    contentBlock.appendChild(div);
}

// const requestEvent$ = clickEvent$.pipe(
//     mergeMap((event) => request())
// );
//
// requestEvent$.subscribe((item) => {
//     console.log(item)
// });