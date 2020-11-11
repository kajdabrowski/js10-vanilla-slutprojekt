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
        let request = await fetch(url)// (randomBeerUrl)
        let data  = await request.json()

        return data; //beerName.innerText = data[0].name;  // Ett annat alternativ
        
    } catch(error) {
        console.log('error', error)
    } 
}


async function loadPage(){  //döp om till ett bättre namn.
    let myJsonData = await getData(randomBeerUrl);
       renderData(myJsonData[0])
    //Allt som ska på beer-info kan göras här.
}
loadPage()

 

async function renderData(data) { //Tar emot 1 öl-objekt från getData funktionen.
    let beerName = document.querySelector(".beer-name") 
    let beerImage = document.querySelector(".beer-image")
    beerName.innerText = data.name
    beerImage.src =data.image_url 
const boxList = document.querySelectorAll(".info-box-list > li") 
boxList[0].innerText = "Description:" + data.description   
document.querySelector(".li-image").src = data.image_url   //Bild funkar, men storlek är fucked.  
boxList[1].innerText = "Alcohol by volume: " + data.abv    
boxList[2].innerText = "Volume:" + data.volume    
boxList[3].innerText = "Ingredients:" + data.ingredients 
boxList[4].innerText = "Hops:" + data.ingredients.hops[0].hops //Fixa denna     
boxList[5].innerText = "Food pairing:" + data.food_pairing  
boxList[6].innerText = "Brewers tips:" + data.brewers_tips 

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
        // console.log(b[counter].childElementCount)
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
        
        // Lägg till hide och show klasserna här (från renderAllBeers). 
    
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
    // let page = document.querySelector(".search-next-page")
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




// console.log('getData', getData())

// let beerDescription = document.querySelector(".li-description")
// let beerImageTwo = document.querySelector(".li-image")
// let beerAlcoholByVolume = document.querySelector(".li-alcohol-by-volume")
// let beerVolume = document.querySelector(".li-volume")
// let beerIngredients = document.querySelector(".li-ingredients")
// let beerHops = document.querySelector(".li-hops")
// let beerFoodPairing = document.querySelector(".li-food-pairing")
// let beerBrewersTips = document.querySelector(".li-brewers-tips")


// beerDescription.innerText = "Description:" + myJsonData[0].description
// beerImageTwo.innerText = myJsonData[0].image_url, 
// beerAlcoholByVolume.innerText = "Alcohol by volume:" + myJsonData[0].abv

// getData().then(data => beerDescription.innerText = "Description:" + data[0].description)
// getData().then(data => beerImageTwo.innerText = data[0].image_url)
// getData().then(data => beerAlcoholByVolume.innerText = "Alcohol by volume:" + data[0].abv)
// getData().then(data => beerVolume.innerText = "Volume:" + data[0].volume)
// getData().then(data => beerIngredients.innerText = "Ingredients:" + data[0].ingredients)
// getData().then(data => beerHops.innerText = "Hops:" + data[0].ingredients.hops[0, 1, 2, 3].name)
// getData().then(data => beerFoodPairing.innerText = "Food pairing:" + data[0].food_pairing)
// getData().then(data => beerBrewersTips.innerText = "Brewers tips:" + data[0].brewers_tips)
// console.log('getData', getData())


// let beerImageDOM = document.querySelector("div.beer-image")
// let beerImg = document.beer-image.createElement("img");
// beerImg.setAttribute("src", data[0].image_url);
