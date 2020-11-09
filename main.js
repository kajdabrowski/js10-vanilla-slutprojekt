const buttons = document.querySelectorAll(".nav > button")



for( let button of buttons){
    button.addEventListener("click", () => {
        document.querySelectorAll(".main-page > section").forEach(
            section => section.classList.remove("show"))
                                                     
      const section = document.querySelector("." + button.innerText)
      section.classList.add("show")
    })
}   

const seeMoreBtn = document.querySelector(".see-more-btn")
seeMoreBtn.addEventListener("click", () =>{
   document.querySelector(".Home").classList.remove("show")

   document.querySelector(".Beer-Info").classList.add("show")
})

let randomBeerUrl = "https://api.punkapi.com/v2/beers/random"

async function getData() { //Fetchar en slumpad öl. Bör skrivas om så att variabeln kan ändras för att återanvända funktionen och fetcha olika dataset <-- KOM IHÅG!
    // try to fetch data, if anything goes wrong catch the error and log it.
    try {
        let request = await fetch(randomBeerUrl)
        let data  = await request.json()

        return data; //beerName.innerText = data[0].name;  // Ett annat alternativ
        
    } catch(error) {
        console.log('error', error)
    }
}
let myJsonData = getData();





// console.log("Json",myJsonData);
getData().then(data => beerName.innerText = data[0].name)
getData().then(data => beerImage.src = data[0].image_url)

// let beerImageDOM = document.querySelector("div.beer-image")
// let beerImg = document.beer-image.createElement("img");
// beerImg.setAttribute("src", data[0].image_url);

let beerName = document.querySelector(".beer-name") 
let beerImage = document.querySelector(".beer-image")

// console.log('getData', getData())

let beerDescription = document.querySelector(".li-description")
let beerImageTwo = document.querySelector(".li-image")
let beerAlcoholByVolume = document.querySelector(".li-alcohol-by-volume")
let beerVolume = document.querySelector(".li-volume")
let beerIngredients = document.querySelector(".li-ingredients")
let beerHops = document.querySelector(".li-hops")
let beerFoodPairing = document.querySelector(".li-food-pairing")
let beerBrewersTips = document.querySelector(".li-brewers-tips")


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


getData().then(data => renderData(data[0])) //Allt som ska på beer-info kan göras här. 

async function renderData(data) { //Tar emot 1 öl-objekt från getData funktionen.
//    let data = dataArr[0]
//    console.log(dataArr)
//    console.log(data)
const boxList = document.querySelectorAll(".info-box-list > li") 
boxList[0].innerText = "Description:" + data.description   
// console.log(data)
document.querySelector(".li-image").src = data.image_url   //Bild funkar, men storlek är fucked.  
boxList[1].innerText = "Alcohol by volume: " + data.abv    
boxList[2].innerText = "Volume:" + data.volume    
boxList[3].innerText = "Ingredients:" + data.ingredients   
boxList[4].innerText = "Hops:" + data.ingredients.hops[0, 1, 2, 3].name //Fixa denna     
boxList[5].innerText = "Food pairing:" + data.food_pairing  
boxList[6].innerText = "Brewers tips:" + data.brewers_tips 
}




