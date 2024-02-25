let input = document.getElementById('searchInput');
let resContainer = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');

function createAndAppend(data){
    let container = document.createElement('div');
    container.classList.add('result-item');
    resContainer.appendChild(container);

    let titleEl = document.createElement('a');
    titleEl.href = data.link;
    titleEl.textContent = data.title;
    titleEl.target = '_blank';
    titleEl.classList.add('result-title');
    container.appendChild(titleEl);

    let line = document.createElement('br');
    container.appendChild(line);

    let urlEl = document.createElement('a');
    urlEl.href = data.link;
    urlEl.textContent = data.link;
    urlEl.target = '_blank';
    urlEl.classList.add('result-url');
    container.appendChild(urlEl);

    let desc = document.createElement('p');
    desc.classList.add('link-description');
    desc.textContent = data.description;
    container.appendChild(desc);
}

function display(data){
    spinner.classList.toggle('d-none');
    for(let res of data){
        createAndAppend(res);
    }
}

function search(){
    let val = input.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + val;
    let options = {
        method: 'GET'
    }
    fetch(url, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let {search_results} = jsonData;
            display(search_results);
        })
}

input.addEventListener('keydown', function(event){
    if(event.keyCode === 13){
        spinner.classList.toggle('d-none');
        resContainer.innerHTML = "";
        search();
    }
});