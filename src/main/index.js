import { app, BrowserWindow, dialog } from 'electron'

import { autoUpdater } from 'electron-updater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}


function checkUpdate () {
  const server = "https://hazel-server-iifnmbxxya.now.sh"
  const feed = `${server}/update/${process.platform}/${app.getVersion()}`
  
  autoUpdater.on('error', err => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Yes'],
      title: 'Update Error',
      message: 'errrrr',
      detail: err.toString()
    }
  
    dialog.showMessageBox(dialogOpts, (response) => {
    })
  })
  
  autoUpdater.on('checking-for-update', (event, releaseNotes, releaseName) => {

  })
  
  autoUpdater.on('update-not-available', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Yes'],
      title: 'update not available...',
      message: '',
      detail: ''
    }
  
    dialog.showMessageBox(dialogOpts, (response) => {
    })
  })
  
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }
  
    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
  })
  
  autoUpdater.setFeedURL(feed);
  
  autoUpdater.checkForUpdates();
}

function start () { 
  createWindow();
  checkUpdate();
}

app.on('ready', start)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

