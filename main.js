/* ***** NAV BAR ***** */

const buttons = document.querySelectorAll(".nav > button")



for( let button of buttons){
    button.addEventListener("click", () => {
        document.querySelectorAll(".main-page > section").forEach(
            section => section.classList.remove("show"))
                                                     
      const section = document.querySelector("." + button.innerText)
      section.classList.add("show")
    })
}   

/* ***** SEE MORE BTN ***** */
const seeMoreBtn = document.querySelector(".see-more-btn")
seeMoreBtn.addEventListener("click", () =>{
   document.querySelector(".Home").classList.remove("show")

   document.querySelector(".Beer-Info").classList.add("show")
})

let randomBeerUrl = "https://api.punkapi.com/v2/beers/random"
let allBeerUrl = "https://api.punkapi.com/v2/beers?per_page=80"

/* ***** HOME FETCH ***** */

async function getData(url) { //Fetchar en slumpad öl. Bör skrivas om så att variabeln kan ändras för att återanvända funktionen och fetcha olika dataset <-- KOM IHÅG!
    // try to fetch data, if anything goes wrong catch the error and log it.
    try {
        let request = await fetch(url)
        let data  = await request.json()

        return data; 
        
    } catch(error) {
        console.log('error', error)
    } 
}


async function loadPage(){  
    let myJsonData = await getData(randomBeerUrl);
       renderData(myJsonData[0])
    
}
loadPage()

 

async function renderData(data) { //Tar emot 1 öl-objekt från getData funktionen.
    let beerName = document.querySelector(".beer-name") 
    let beerImage = document.querySelector(".beer-image")
    beerName.innerText = data.name 
const boxList = document.querySelectorAll(".info-box-list > li") 
boxList[0].innerText = "Description:" + data.description   
if(data.image_url){

    document.querySelector(".li-image").src = data.image_url 
    beerImage.src = data.image_url     
} else{
    beerImage.src = "https://media.istockphoto.com/photos/mature-punk-rocker-holding-a-pint-of-beer-picture-id520847074?k=6&m=520847074&s=170667a&w=0&h=Wv4SFgeFm_fdC3BoU80cV4rS1bCf93U-bXxwYGxPWmQ="
    document.querySelector(".li-image").src = "https://media.istockphoto.com/photos/mature-punk-rocker-holding-a-pint-of-beer-picture-id520847074?k=6&m=520847074&s=170667a&w=0&h=Wv4SFgeFm_fdC3BoU80cV4rS1bCf93U-bXxwYGxPWmQ="
}
boxList[1].innerText = "Alcohol by volume: " + data.abv    
boxList[2].innerText = "Volume:" + " " + data.volume.value + " " + data.volume.unit
let newArrMalts = []
for(let i = 0 ; i < data.ingredients.malt.length; i++){
    newArrMalts.push(data.ingredients.malt[i].name+"\n") 
}   
boxList[3].innerText = "Ingredients:"+ " "+ "Malts-" + newArrMalts + " " + "Yeast-" + data.ingredients.yeast
let newArrHops = []
for (let i = 0; i < data.ingredients.hops.length; i++){
    newArrHops.push(data.ingredients.hops[i].name+" ")
}
boxList[4].innerText = "Hops:" + " " + newArrHops    
boxList[5].innerText = "Food pairing:" + " " + data.food_pairing  
boxList[6].innerText = "Brewers tips:" + " " + data.brewers_tips 

}

document.addEventListener("keypress", function (e){ 
    if (e.key === "Enter"){
        searchBeer()
    }
})

async function searchBeer(){
    const input = document.querySelector(".input-search")
    const beerData = await getData(allBeerUrl + `&beer_name=${input.value.toLowerCase()}`)
    document.querySelector(".search-result").innerHTML = ""
    document.querySelector(".search-nav").innerHTML = ""

        for(let i = 0; i < Math.ceil(beerData.length/10); i++){
            renderSearchPages(i)
        } 
        let counter = 0; 
        let searchPage = document.querySelectorAll(".search-result > div")
    for(let i = 0; i < beerData.length; i++){
        if (searchPage[counter].childElementCount === 10){
            counter++
        }
        renderAllBeers(beerData[i], counter)
    }
    searchPage[0].classList.add("active")
}

function renderSearchPages(index) {
    let searchPage = document.querySelector(".search-result")
    let divTag = document.createElement("div")
    divTag.classList.add("hide")
    let searchNav = document.querySelector(".search-nav")
    let searchTag = document.createElement("p")
    searchTag.innerText = index; 
    searchPage.append(divTag)
    searchNav.append(searchTag)
    searchTag.addEventListener("click", () => {
        document.querySelectorAll(".search-result > div").forEach(element => element.classList.remove("active"))
        divTag.classList.add("active")
        
    
    } )
    
}




function renderAllBeers(beer, index) {
    let beerList = document.querySelectorAll(".search-result > div")
    let liTag = document.createElement("li")
    beerList[index].append(liTag)
    liTag.innerText=beer.name
    liTag.addEventListener("click", () => {
        renderData(beer)
    }) 

}



function nextPage(beer) {
    let liTag = document.createElement("li")
    page.append(liTag)
    liTag.innerText=beer.name

}





/* 
-> Search
* Paginera sökresultaten, vid fler resultat än 10st. 

* Search resultaten ska vara klickbara och gå till beer info för den klickade ölen. 
-> Beer info ska länka rätt information om ölen.
- CSS för bilderna, inkl. beer info. 
- Ha med öl-punkaren på alla sidor!!!! 
*/




