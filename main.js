const buttons = document.querySelectorAll(".nav > button")



for( let button of buttons){
    button.addEventListener("click", () => {
        document.querySelectorAll(".main-page > section").forEach(
            section => section.classList.remove("show"))
      
      const section = document.querySelector("." + button.innerText)
      section.classList.add("show")
    })
}


const beerbutton = document.querySelector(".see-more > button")


    beerbutton.addEventListener("click", () => {
        document.querySelectorAll(".main-page > section").forEach(
            section => section.classList.remove("show"))
      
      const section = document.querySelector("." + beerbutton.innerText)
      section.classList.add("show")
    })




