window.addEventListener('load', function(){
    var url = "https://api.punkapi.com/v2/beers"

    makeRequest(url, function(){
        var jsonString = this.responseText;
        var beers = JSON.parse(jsonString);
        dropdown(beers);
    })
});

var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
}

var dropdown = function(beers){
    var select = document.querySelector('#beerSelect');
    
    beers.forEach(function(beer, index) {
        beer.index = index;
        var option = document.createElement('option');
        option.value = index;
        option.innerText = beer.name;
        select.appendChild(option);
    });

    select.addEventListener('change', function (event){
        var index = this.value;
        var beer = beers[index];

        updateInfo(beer)

        var jsonString = JSON.stringify(beer);
        localStorage.setItem('selectedBeer', jsonString);
    })
}

var render = function(beers){
    var storedBeer = localStorage.getItem('selectedBeer');
    var beerToShow = null;

    if (storedBeer){
        beerToShow = JSON.parse(storedBeer);
        var select = document.querySelector('#beerSelect');
        select.selectedIndex = beerToShow.index;
    }
}

var updateInfo = function(beer){
    var img = document.querySelector('#img')
    img.src = beer.image_url;

    var pTag = document.querySelectorAll('#info p');
    pTag[0].innerText = beer.name;
    pTag[1].innerText = beer.tagline;
    pTag[2].innerText = beer.description;

}



