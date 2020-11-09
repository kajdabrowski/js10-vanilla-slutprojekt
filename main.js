const buttons = document.querySelectorAll(".nav > button")



for( let button of buttons){
    button.addEventListener("click", () => {
        document.querySelectorAll(".main-page > section").forEach(
            section => section.classList.remove("show"))
      
      const section = document.querySelector("." + button.innerText)
      section.classList.add("show")
    })
}

let randomBeer = "https://api.punkapi.com/v2/beers/random"

async function getData(name) {
    // try to fetch data, if anything goes wrong catch the error and log it.
    try {
        let request = await fetch(randomBeer)
        let data  = await request.json()

        return data; //beerName.innerText = data[0].name;  // Ett annat alternativ
        
    } catch(error) {
        console.log('error', error)
    }
}
getData().then(data => beerName.innerText = data[0].name)
getData().then(data => beerImage.innerText = data[0].image_url)

// let beerImageDOM = document.querySelector("div.beer-image")
// let beerImg = document.beer-image.createElement("img");
// beerImg.setAttribute("src", data[0].image_url);

let beerName = document.querySelector(".beer-name") 
let beerImage = document.querySelector(".beer-image")

console.log('getData', getData())



























// const beerbutton = document.querySelector(".see-more > button")


//     beerbutton.addEventListener("click", () => {
//         document.querySelectorAll(".main-page > section").forEach(
//             section => section.classList.remove("show"))
      
//       const section = document.querySelector("." + beerbutton.innerText)
//       section.classList.add("show")
//     })


