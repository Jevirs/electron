import { app, BrowserWindow, autoUpdater } from 'electron'

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

app.on('ready', createWindow)

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

const server = "https://hazel-server-cbfvpxtzoc.now.sh"
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.on('error', err => {
    alert(err)
})

autoUpdater.on('checking-for-update', data => {
    alert('checking-for-update:' + data)
})

autoUpdater.on('update-not-available', data => {
    alert('update-not-available:' + data)
})

autoUpdater.on('update-downloaded', data => {
    alert('update-downloaded:' + data)
    autoUpdater.quitAndInstall()
})

autoUpdater.setFeedURL(feed);

autoUpdater.checkForUpdates();