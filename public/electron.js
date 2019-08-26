const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let menu;

require('update-electron-app')({
  repo: 'kitze/react-electron-example',
  updateInterval: '1 hour'
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    center: true,
    minWidth: 1280,
    minHeight: 720,
    title: app.getName(),
    backgroundColor: '#FCFCFC',
    titleBarStyle: "hiddenInset" });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.webContents.openDevTools()
  menu = Menu.buildFromTemplate([
    ...(process.platform === 'darwin' ? [{
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
        label: 'File',
        submenu: [
            {
              label:'New Project',
              accelerator: 'CmdOrCtrl+N',
            },
            {
              label:'New Module',
              accelerator: 'CmdOrCtrl+T',
            },
            {
              label:'New Screen',
              accelerator: 'CmdOrCtrl+G',
            },
            { type:'separator' }
        ]
    }
  ])
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
