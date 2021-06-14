const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const SELECTIONS = [{ //objekt array 
        name: 'rock',
        emoji: '👊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click',
        e => {
            const selectionName = selectionButton.dataset.selection
            const selection = SELECTIONS.find(selection => selection.name === selectionName)
            makeSelection(selection)
        })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    //fügt unter "computer" die emojis hinzu
    //als erstes die computer auswahl (rechts)
    //dann user auswahl (links) 
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    //fügt immer einen punkt zum gewinner hinzu 
    if (yourWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)
};

//erlaubt uns am ende von der classe= result-score einen punkt aufzustocken
function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div') //Erstelllt ein div Element 
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}


// wenn .beats gleich .name ist, gewinnt die auswahl 
function isWinner(selection, opponentSelection) {
    return (selection.beats === opponentSelection.name)
}

//gibt uns eine zufällige auswahl für den computer,  wenn wir randomSelection() aufrufen 
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}