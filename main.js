// constants
const ROCK = 'rock-obj'
const PAPER = 'paper-obj'
const SCISSORS = 'scissors-obj'
const USER_SELECTION = 'user-selection'
const COMPUTER_SELECTION = 'computer-selection'

// screens
const screen1 = document.getElementById("screen-1")
const screen2 = document.getElementById("screen-2")
const rulesModal = document.getElementById("rules-modal")

// game objects
const screen2Rock = document.querySelector(`#screen-2 .${ROCK}`)
const screen2Paper = document.querySelector(`#screen-2 .${PAPER}`)
const screen2Scissors = document.querySelector(`#screen-2 .${SCISSORS}`)

function switchToScreen(screen, data) {
  // hide all screens
  document.querySelectorAll(".screen")
    .forEach(sc => sc.style.display = 'none')

  // open relevant screen
  switch (screen) {
    // new game screen
    case 1:
      screen1.style.display = 'flex'
      // TODO: reset user and computer selections in screen 2
      // resetScreen2Selections()
      break
    
    // "user has selected" screen
    case 2:
      if (data?.userSelection === PAPER) {
        document.querySelector(`#screen-2 .${PAPER}`)?.classList.add('user-selection')
      } else if (data?.userSelection === ROCK) {
        document.querySelector(`#screen-2 .${ROCK}`)?.classList.add('user-selection')
      } if (data?.userSelection === SCISSORS) {
        document.querySelector(`#screen-2 .${SCISSORS}`)?.classList.add('user-selection')
      }

      screen2.style.display = 'flex'
      break
    
    default:
      throw new Error("Unknown screen number")
  }
}

function resetScreen2Selections() {
  screen2Rock?.classList.remove(USER_SELECTION)
  screen2Rock?.classList.remove(COMPUTER_SELECTION)
  screen2Paper?.classList.remove(USER_SELECTION)
  screen2Paper?.classList.remove(COMPUTER_SELECTION)
  screen2Scissors?.classList.remove(USER_SELECTION)
  screen2Scissors?.classList.remove(COMPUTER_SELECTION)
}

function onPaperClicked() {
  // switchToScreen(2, { userSelection: PAPER })
}

function onScissorsClicked() {
  // switchToScreen(2, { userSelection: SCISSORS })
}

function onRockClicked() {
  // switchToScreen(2, { userSelection: ROCK })
}

// TODO: remove
function dummy() {
  // switchToScreen(1)
}

function showRules() {
  rulesModal.style.display = 'flex'
}

function hideRules() {
  rulesModal.style.display = 'none'
}
