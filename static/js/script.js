
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

// Challenge 3 : Rock Paper Scissors Game
function rpsGame(chosenItem){
    let yourChoice = chosenItem.id
    let botChoice = randomChoices(randomNumber(3))
    console.log(yourChoice, botChoice)
    result = computeWinner(yourChoice, botChoice)
    message = convertToMessage(result)
    console.log(message)
    displayFinalMessage(message, yourChoice, botChoice)
}

function randomNumber(upperLimit){
    return Math.floor(Math.random() * upperLimit) + 1
}

function randomChoices(number){
    let choiceReflet = {
        1 : 'rock',
        2 : 'paper',
        3 : 'scissors',
    }
    return choiceReflet[number]
}

function computeWinner(yourChoice, botChoice){
    let scoreMap = {
        'rock' : {'rock': 0.5, 'paper': 0, 'scissors': 1},
        'paper' : {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors' : {'rock': 0, 'paper': 1, 'scissors': 0.5},
    }

    return scoreMap[yourChoice][botChoice]
}

function convertToMessage(result){
    let messageMap = {
        0 : {'message': 'You lost!', 'color': 'red'},
        0.5 : {'message': 'You drew!', 'color': 'yellow'},
        1 : {'message': 'You won!', 'color': 'green'},
    }
    return messageMap[result]
}

function displayFinalMessage(message, yourChoice, botChoice){
    let imageMap = {
        'rock': document.querySelector("#rock").src,
        'paper': document.querySelector("#paper").src,
        'scissors': document.querySelector("#scissors").src,
    }

    document.querySelector("#rock").remove()
    document.querySelector("#paper").remove()
    document.querySelector("#scissors").remove()

    let yourImg = document.createElement("div")
    let botImg = document.createElement("div")
    let finalMessage = document.createElement("div")

    yourImg.innerHTML = `<img src=${imageMap[yourChoice]} width=150 height=150 style="box-shadow: 5px 5px 50px blue">`
    finalMessage.innerHTML =   `<h1 style="color: ${message['color']};padding: 30px;font-size:60px;">${message['message']}</h1>`
    botImg.innerHTML = `<img src=${imageMap[botChoice]} width=150 height=150 style="box-shadow: 5px 5px 50px red">`

    document.querySelector(".flex-container-rps").appendChild(yourImg)
    document.querySelector(".flex-container-rps").appendChild(finalMessage)
    document.querySelector(".flex-container-rps").appendChild(botImg)

}

// Challenge 4: Change Colors of Buttons
function changeBtnColors(choice){
    var buttons = document.getElementsByTagName("button")
    var originalColors = []
    for(let i = 0; i < buttons.length; i++){
        originalColors.push(buttons[i].classList[1])
    }
    console.log(originalColors)
    // if(choice.value === 'random'){
    //     randomColor()
    // }else if(choice.value === 'red'){
    //     specificColor(choice.value)
    // }else if(choice.value === 'green'){
    //     specificColor(choice.value)
    // }else if(choice.value === 'yellow'){
    //     specificColor(choice.value)
    // }else if(choice.value === 'reset'){
    //     resetColor()
    // }
}