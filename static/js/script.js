
// Challenge 1: Calculate Your Age in Days
function ageInDays() {
    let ageInYear = prompt("Hey Buddy, which year did your born?")
    let ageInDays = (2021 - ageInYear) * 365
    console.log(ageInDays)
    let h1 = document.createElement('h1')
    let result = document.createTextNode("You are " + ageInDays + " years old.")
    h1.appendChild(result)
    document.querySelector("#ageid-result").appendChild(h1);
}

function resetResultDiv() {
    document.querySelector("#ageid-result h1").remove();
}

// Challenge 2 : Generate Cats
document.querySelector("#gen-cat-btn").addEventListener("click", catGenerator)

function catGenerator() {
    let img = document.createElement("img")
    img.src = "http://thecatapi.com/api/images/get?mime_types=gif&size=small"
    document.querySelector(".flex-container-cat-gen").appendChild(img)
}

// Challenge 3 : Rock Paper Scissors Game
function rpsGame(chosenItem) {
    let yourChoice = chosenItem.id
    let botChoice = randomChoices(randomNumber(3))
    console.log(yourChoice, botChoice)
    result = computeWinner(yourChoice, botChoice)
    message = convertToMessage(result)
    console.log(message)
    displayFinalMessage(message, yourChoice, botChoice)
}

function randomNumber(upperLimit) {
    return Math.floor(Math.random() * upperLimit)
}

function randomChoices(number) {
    let choiceReflet = {
        0: 'rock',
        1: 'paper',
        2: 'scissors',
    }
    return choiceReflet[number]
}

function computeWinner(yourChoice, botChoice) {
    let scoreMap = {
        'rock': { 'rock': 0.5, 'paper': 0, 'scissors': 1 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'rock': 0, 'paper': 1, 'scissors': 0.5 },
    }

    return scoreMap[yourChoice][botChoice]
}

function convertToMessage(result) {
    let messageMap = {
        0: { 'message': 'You lost!', 'color': 'red' },
        0.5: { 'message': 'You drew!', 'color': 'yellow' },
        1: { 'message': 'You won!', 'color': 'green' },
    }
    return messageMap[result]
}

function displayFinalMessage(message, yourChoice, botChoice) {
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
    finalMessage.innerHTML = `<h1 style="color: ${message['color']};padding: 30px;font-size:60px;">${message['message']}</h1>`
    botImg.innerHTML = `<img src=${imageMap[botChoice]} width=150 height=150 style="box-shadow: 5px 5px 50px red">`

    document.querySelector(".flex-container-rps").appendChild(yourImg)
    document.querySelector(".flex-container-rps").appendChild(finalMessage)
    document.querySelector(".flex-container-rps").appendChild(botImg)

}


// Challenge 4: Change Colors of Buttons
var buttons, originalColors
buttons = document.getElementsByTagName("button")
originalColors = []
for (let i = 0; i < buttons.length; i++) {
    originalColors.push(buttons[i].classList[1])
}
console.log(originalColors)

function changeBtnColors(choice) {
    if (choice.value === 'random') {
        randomColor()
    } else if (choice.value === 'red') {
        specificColor(choice.value)
    } else if (choice.value === 'green') {
        specificColor(choice.value)
    } else if (choice.value === 'yellow') {
        specificColor(choice.value)
    } else if (choice.value === 'reset') {
        resetColor()
    }
}

function randomColor() {
    let colorChoices = ['btn-primary', 'btn-warning', 'btn-secondary', 'btn-danger', 'btn-success']
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove(buttons[i].classList[1])
        buttons[i].classList.add(colorChoices[randomNumber(5)])
    }
}

function specificColor(color) {
    var colorMap = {
        'red': 'btn-danger',
        'green': 'btn-success',
        'yellow': 'btn-warning',
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove(buttons[i].classList[1])
        buttons[i].classList.add(colorMap[color])
    }
}

function resetColor() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove(buttons[i].classList[1])
        buttons[i].classList.add(originalColors[i])
    }
}

// Challenge 5: Blackjack
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsover': false,
}

const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lossSound = new Audio('static/sounds/aww.mp3')

document.getElementById("hit").addEventListener("click", blackjackHit)
document.getElementById("stand").addEventListener("click", dealerLogic)
document.getElementById("deal").addEventListener("click", blackjackDeal)

const YOU = blackjackGame.you
const DEALER = blackjackGame.dealer
const cards = blackjackGame.cards
const cardMap = blackjackGame.cardMap

function blackjackHit() {
    if (blackjackGame.isStand === false) {
        if (YOU.score <= 21) {
            let card = randomCard()
            showCard(YOU, card)
            updateScore(YOU, card)
            console.log(YOU.score)
            showScore(YOU)
            hitSound.play()
        }
    }
}

function randomCard() {
    return cards[randomNumber(13)]
}

function showCard(activePlayer, card) {
    let newCard = document.createElement("img")
    newCard.src = `static/images/${card}.png`
    document.querySelector(activePlayer.div).appendChild(newCard)
}

function updateScore(player, card) {
    if (card == 'A') {
        if (player.score + cardMap[card][1] > 21) {
            player.score += cardMap[card][0]
        } else {
            player.score += cardMap[card][1]
        }
    } else {
        player.score += cardMap[card]
    }
}

function showScore(player) {
    if (player.score > 21) {
        document.querySelector(player.scoreSpan).textContent = "BUST!"
        document.querySelector(player.scoreSpan).style.color = "red"
    } else {
        document.querySelector(player.scoreSpan).innerHTML = player.score
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

async function dealerLogic() {
    blackjackGame.isStand = true
    while (DEALER.score <= 16) {
        let card = randomCard()
        showCard(DEALER, card)
        updateScore(DEALER, card)
        console.log(DEALER.score)
        showScore(DEALER)
        hitSound.play()
        await sleep(1000)
    }
    showResult(computeWinner())
}

function computeWinner() {
    let winner
    if (YOU.score != DEALER.score) {
        if (YOU.score <= 21) {
            if (YOU.score > DEALER.score) {
                winner = YOU
                blackjackGame.wins++;
            } else if (YOU.score < DEALER.score) {
                if (DEALER.score <= 21) {
                    winner = DEALER
                    blackjackGame.losses++;
                } else {
                    winner = YOU
                    blackjackGame.wins++;
                }
            }
        } else if (DEALER.score <= 21) {
            winner = DEALER
            blackjackGame.losses++;
        }else{
            blackjackGame.draws++;
        }
    } else {
        blackjackGame.draws++;
    }

    return winner
}

function showResult(winner) {
    console.log(winner)
    var message, messageColor
    if (winner === YOU) {
        message = "You won!"
        messageColor = "green"
    } else if (winner === DEALER) {
        message = "You lost!"
        messageColor = "red"
    } else {
        message = "You drew!"
        messageColor = "black"
    }

    document.getElementById("blackjack-result").textContent = message
    document.getElementById("blackjack-result").style.color = messageColor

    document.querySelector("#wins").textContent = blackjackGame.wins
    document.querySelector("#losses").textContent = blackjackGame.losses
    document.querySelector("#draws").textContent = blackjackGame.draws

    blackjackGame.turnsover = true
}

function blackjackDeal() {
    if (blackjackGame.turnsover) {
        document.querySelector(YOU.scoreSpan).textContent = 0
        document.querySelector(YOU.scoreSpan).style.color = "white"
        document.querySelector(DEALER.scoreSpan).textContent = 0
        document.querySelector(DEALER.scoreSpan).style.color = "white"

        yourImgs = document.querySelector(YOU.div).querySelectorAll("img")
        dealerImgs = document.querySelector(DEALER.div).querySelectorAll("img")
        for (let i = 0; i < yourImgs.length; i++) {
            yourImgs[i].remove()
        }
        for (let i = 0; i < dealerImgs.length; i++) {
            dealerImgs[i].remove()
        }

        YOU.score = 0
        DEALER.score = 0

        blackjackGame.isStand = false
        blackjackGame.turnsover = false

        document.getElementById("blackjack-result").textContent = "Let's Play"
        document.getElementById("blackjack-result").style.color = "black"
    }
}