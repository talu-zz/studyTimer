// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const path = require('path')
const fs = require('fs');
const { contextBridge } = require('electron');
const ipcRenderer = require('electron').ipcRenderer;

let randomImageSource = ''

fs.readdir(path.join(__dirname, '../imgs'), (err, files) => {
  if (err) {
    throw err;
  }
  const imageNr = Math.floor(Math.random() * (files.length))
  randomImageSource = path.join(__dirname, '../imgs', files[imageNr])
})

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('breakImage').src = randomImageSource;
})

contextBridge.exposeInMainWorld(
  "api", {
  close: () => {
    console.log('send to main close')
    ipcRenderer.send('toMain', 'close-app')
  },
  restart: () => {
    console.log('send to main restat')
    ipcRenderer.send('toMain', 'restart-timer')
  }
})
