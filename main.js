// constants
const ROCK = 'rock-obj'
const PAPER = 'paper-obj'
const SCISSORS = 'scissors-obj'
const USER_SELECTION = 'user-selection'
const COMPUTER_SELECTION = 'computer-selection'
const TIE = 'tie'
const USER_WINS = 'user-wins'
const COMPUTER_WINS = 'computer-wins'
const USER_SCORE_STORAGE_KEY = 'user-score'

// screens and widgets
const screen1 = document.getElementById("screen-1")
const screen2 = document.getElementById("screen-2")
const rulesModal = document.getElementById("rules-modal")

const youWinText = document.querySelector(".you-win")
const youLoseText = document.querySelector(".you-lose")
const youTieText = document.querySelector(".you-tie")
const playAgainBtn = document.querySelector(".btn-play-again")
const scoreValueText = document.querySelector(".score-value")

// game objects
const screen2RockUser = document.querySelector(`#screen-2 .user.${ROCK}`)
const screen2PaperUser = document.querySelector(`#screen-2 .user.${PAPER}`)
const screen2ScissorsUser = document.querySelector(`#screen-2 .user.${SCISSORS}`)

const screen2RockComputer = document.querySelector(`#screen-2 .computer.${ROCK}`)
const screen2PaperComputer = document.querySelector(`#screen-2 .computer.${PAPER}`)
const screen2ScissorsComputer = document.querySelector(`#screen-2 .computer.${SCISSORS}`)

// scores
let userScore = 0


function switchToScreen(screen, data) {
  // hide all screens
  document.querySelectorAll(".screen")
    .forEach(sc => sc.style.display = 'none')

  // open relevant screen
  switch (screen) {
    // new game screen
    case 1:
      screen1.style.display = 'flex'
      break

    // "user has selected" screen
    case 2:
      const userSelection = data?.userSelection

      if (userSelection === PAPER) {
        document.querySelector(`#screen-2 .user.${PAPER}`)?.classList.add('user-selection')
      } else if (userSelection === ROCK) {
        document.querySelector(`#screen-2 .user.${ROCK}`)?.classList.add('user-selection')
      } if (userSelection === SCISSORS) {
        document.querySelector(`#screen-2 .user.${SCISSORS}`)?.classList.add('user-selection')
      }

      screen2.style.display = 'flex'

      const computerSelection = takeComputerTurn()
      const roundResults = computeRound(userSelection, computerSelection)

      setTimeout(() => {
        switch (roundResults) {
          case USER_WINS:
            youWinText.style.display = 'block'
            break;
          case COMPUTER_WINS:
            youLoseText.style.display = 'block'
            break;
          case TIE:
            youTieText.style.display = 'block'
            break;
        }

        playAgainBtn.style.display = 'block'
        scoreValueText.textContent = userScore
      }, 2500)

      break

    default:
      throw new Error("Unknown screen number")
  }
}

function resetScreen2() {
  screen2RockUser?.classList.remove(USER_SELECTION)
  screen2RockComputer?.classList.remove(COMPUTER_SELECTION)
  screen2PaperUser?.classList.remove(USER_SELECTION)
  screen2PaperComputer?.classList.remove(COMPUTER_SELECTION)
  screen2ScissorsUser?.classList.remove(USER_SELECTION)
  screen2ScissorsComputer?.classList.remove(COMPUTER_SELECTION)

  youWinText.style.display = 'none'
  youLoseText.style.display = 'none'
  youTieText.style.display = 'none'
  playAgainBtn.style.display = 'none'
}

function onPaperClicked() {
  switchToScreen(2, { userSelection: PAPER })
}

function onScissorsClicked() {
  switchToScreen(2, { userSelection: SCISSORS })
}

function onRockClicked() {
  switchToScreen(2, { userSelection: ROCK })
}

function showRules() {
  rulesModal.style.display = 'flex'
}

function hideRules() {
  rulesModal.style.display = 'none'
}

function saveScores() {
  window.sessionStorage.setItem(USER_SCORE_STORAGE_KEY, `${userScore}`)
}

function loadScores() {
  userScore = parseInt(window.sessionStorage.getItem(USER_SCORE_STORAGE_KEY), 10) || 0
  scoreValueText.textContent = userScore
}

function onPlayAgain() {
  resetScreen2()
  switchToScreen(1)
}

function takeComputerTurn() {
  const options = [ROCK, PAPER, SCISSORS]
  const computerSelectionIndex = Math.floor(Math.random() * options.length)
  const computerSelection = options[computerSelectionIndex]

  setTimeout(() => {
    if (computerSelection === PAPER) {
      document.querySelector(`#screen-2 .computer.${PAPER}`)?.classList.add('computer-selection')
    } else if (computerSelection === ROCK) {
      document.querySelector(`#screen-2 .computer.${ROCK}`)?.classList.add('computer-selection')
    } if (computerSelection === SCISSORS) {
      document.querySelector(`#screen-2 .computer.${SCISSORS}`)?.classList.add('computer-selection')
    }
  }, 2000)

  return computerSelection
}

function computeRound(userSelection, computerSelection) {
  let roundResults = TIE

  if (userSelection === ROCK && computerSelection === ROCK) {
    roundResults = TIE
  } else if (userSelection === ROCK && computerSelection === PAPER) {
    roundResults = COMPUTER_WINS
  } else if (userSelection === ROCK && computerSelection === SCISSORS) {
    roundResults = USER_WINS
  } else if (userSelection === PAPER && computerSelection === PAPER) {
    roundResults = TIE
  } else if (userSelection === PAPER && computerSelection === ROCK) {
    roundResults = COMPUTER_WINS
  } else if (userSelection === PAPER && computerSelection === SCISSORS) {
    roundResults = COMPUTER_WINS
  } else if (userSelection === SCISSORS && computerSelection === PAPER) {
    roundResults = USER_WINS
  } else if (userSelection === SCISSORS && computerSelection === ROCK) {
    roundResults = COMPUTER_WINS
  } else if (userSelection === SCISSORS && computerSelection === SCISSORS) {
    roundResults = TIE
  }

  switch (roundResults) {
    case COMPUTER_WINS:
      userScore--
      break
    case USER_WINS:
      userScore++
      break
  }

  saveScores()

  return roundResults
}

// load scores when page loads
loadScores()
