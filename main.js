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

let getData = async requestedData => {
    let request = await fetch(requestedData)
    let data  = await request.json()
    return data
    
}

let data = "https://api.punkapi.com/v2/beers/random"

console.log(getData(randomBeer));


 let beerish = document.querySelector(".beer-name") 

 beerish.innerText = getData(data.name)
  































// const beerbutton = document.querySelector(".see-more > button")


//     beerbutton.addEventListener("click", () => {
//         document.querySelectorAll(".main-page > section").forEach(
//             section => section.classList.remove("show"))
      
//       const section = document.querySelector("." + beerbutton.innerText)
//       section.classList.add("show")
//     })


