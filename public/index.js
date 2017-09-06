window.addEventListener('load', function(){
    var url = "https://api.punkapi.com/v2/beers"

    makeRequest(url, function(){
        if (this.status != 200) return alert("error: Too Many Requests")
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


var selectMalt = function(beer){
    $('#list').empty();
    var ul = document.querySelector('#list');
    var h = document.createElement('h');
    h.innerHTML = "Malt: "
    ul.appendChild(h)

    beer.malt.forEach(function(item){
        var li = document.createElement('li');
        li.innerText = item.name + ": " + item.amount.value + " " + item.amount.unit;
        ul.appendChild(li)
    })
}

var selectHops = function (beer) {
    $('#list1').empty();
    var ul = document.querySelector('#list1');
    var h = document.createElement('h');
    h.innerText = "Hops: "
    ul.appendChild(h)

    beer.hops.forEach(function (item) {
        var li = document.createElement('li');
        li.innerText = item.name + ": " + item.amount.value + " " + item.amount.unit;
        var li1 = document.createElement('li');
        li1.innerText = "Added in " + item.add + " to give " + item.attribute;
        ul.appendChild(li)
        ul.appendChild(li1)
    })
}

var selectYeast = function (beer) {
    $('#list2').empty();
    var ul = document.querySelector('#list2');
    var h = document.createElement('h');
    h.innerText = "Yeast: "
    ul.appendChild(h)

        var li = document.createElement('li');
        li.innerText = beer.yeast
        ul.appendChild(li)
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
    pTag[1].innerText = "ABV " + beer.abv +"%";
    pTag[2].innerText = "Info: " + beer.tagline;
    pTag[3].innerText = "Description: " + beer.description;
    pTag[4].innerText = "Foods good with this beer: " + beer.food_pairing;
    pTag[5].innerText = "Tips: " + beer.brewers_tips;

    selectMalt(beer.ingredients);
    selectYeast(beer.ingredients);
    selectHops(beer.ingredients);

}



