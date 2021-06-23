const { app, BrowserWindow } = require('electron')
const ipcMain = require('electron').ipcMain;
const createTimerWindow = require('./timer/timerWindow')
const createImageWindow = require('./randomImage/randomImage')

let timerWindow = null;
let imageWindow = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
ipcMain.handle('timer-finished', () => {
  imageWindow = createImageWindow()
})

ipcMain.on('toMain', (event, data) => {
  switch (data) {
    case 'restart-timer':
      timerWindow.webContents.send('timer-restart')
      imageWindow.close()
      break
    case 'close-app':
      app.quit()
      break
    default: console.log(`No handling for event ${data}`)
  }
})

app.whenReady().then(() => {
  timerWindow = createTimerWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
