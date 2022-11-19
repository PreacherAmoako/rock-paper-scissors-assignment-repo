const screen1 = document.getElementById("screen-1")
const screen2 = document.getElementById("screen-2")

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
      screen2.style.display = 'flex'
      break
    
    default:
      throw new Error("Unknown screen number")
  }
}

function onPaperClicked() {
  // TODO: implement later
  console.log("test")
  switchToScreen(2)
}

// TODO: remove
function dummy() {
  switchToScreen(1)
}
