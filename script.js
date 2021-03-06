const cards = document.querySelectorAll('.card')

let hasFlippedCard = false
let firstCard, secondCard
let placar = document.getElementById('score')
let score = 0;
let lockBoard = false

function flipCard() {
    if(lockBoard) return
    if(this === firstCard) return

    this.classList.add('flip')
    if(!hasFlippedCard){
        hasFlippedCard = true
        firstCard = this
        return
    }

    secondCard = this
    hasFlippedCard = false
    checkForMatch()
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        score++
        placar.innerHTML = "Placar: " + score
        return
    }

    unFlipCard()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unFlipCard(){
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard();
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffleCards(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition
    })
})()

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})

function locationreload() {
    location.reload();
      
}