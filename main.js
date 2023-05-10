const { app, BrowserWindow } = require('electron')
const path = require('path')


function createWindow () {
  // Créer une fenêtre de navigateur.
  const win = new BrowserWindow({
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'logo.png')
  })

  // Charger l'URL de votre site internet
  win.loadURL('https://hardium.website/')

  // Mettre la fenêtre en plein écran
  win.maximize()

  win.removeMenu()

  win.resizable = true
}


// Cette méthode sera appelée lorsque Electron aura fini de s'initialiser.
// Certaines APIs peuvent être utilisées uniquement après cet événement.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // Sur macOS, il est courant de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. Il est courant pour les
// applications et leur barre de menu de rester actives jusqu'à ce que l'utilisateur quitte
// explicitement avec Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
