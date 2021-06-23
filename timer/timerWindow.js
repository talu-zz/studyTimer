const { BrowserWindow, screen } = require('electron')

const createTimerWindow = () => {

  const width = 200

  const window = new BrowserWindow({
    x: screen.getPrimaryDisplay().workAreaSize.width - width,
    y: 0,
    width: width,
    height: 150,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
    titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    frame: false
  });

  // window.webContents.openDevTools()
  window.loadFile('timer/timer.html')
  return window
}

module.exports = createTimerWindow