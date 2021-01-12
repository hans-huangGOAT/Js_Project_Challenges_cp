
// Challenge 1: Calculate Your Age in Days
function ageInDays(){
    let ageInYear = prompt("Hey Buddy, which year did your born?")
    let ageInDays = (2021-ageInYear) * 365
    console.log(ageInDays)
    let h1 = document.createElement('h1')
    let result = document.createTextNode("You are " + ageInDays + " years old.")
    h1.appendChild(result)
    document.querySelector("#ageid-result").appendChild(h1);
}

function resetResultDiv(){
    document.querySelector("#ageid-result h1").remove();
}

// Challenge 2 : Generate Cats
document.querySelector("#gen-cat-btn").addEventListener("click", catGenerator)

function catGenerator(){
    let img = document.createElement("img")
    img.src = "http://thecatapi.com/api/images/get?mime_types=gif&size=small"
    document.querySelector(".flex-container-cat-gen").appendChild(img)
}