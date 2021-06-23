const { BrowserWindow } = require('electron')
const path = require('path')

const createImageWindow = () => {
  const window = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
    titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    frame: false
  })

  window.maximize()
  // window.webContents.openDevTools()
  window.loadFile('randomImage/randomImage.html')
  return window
}

module.exports = createImageWindow