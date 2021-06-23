// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const ipcRenderer = require('electron').ipcRenderer;
const timerNode = document.querySelector("#timer")
let interval = null

Number.prototype.toMMSS = function () {
  var sec_num = parseInt(this, 10) // don't forget the second param  
  var minutes = Math.floor(sec_num / 60)
  var seconds = sec_num - (minutes * 60);

  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return minutes + ':' + seconds;
}

const startTimer = () => {
  let countdown = 25 * 60
  // let countdown = .1 * 60
  interval = setInterval(() => {
    timerNode.innerHTML = (--countdown).toMMSS();
    if (countdown == 0) {
      clearInterval(interval)
      ipcRenderer.invoke('timer-finished')
    }
  }, 1000)
}

ipcRenderer.on('timer-restart', () => {
  clearInterval(interval)
  startTimer()
})

startTimer()

