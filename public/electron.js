const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const DataStore = require('../src/store/data-store');
const { app, BrowserWindow, Menu, dialog, ipcMain } = electron;

let dataStore = new DataStore(null)
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
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true
    }});
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on('closed', () => (mainWindow = null))
  mainWindow.webContents.openDevTools()
  dataStore.clear()

  BrowserWindow.addDevToolsExtension('/Users/rawipon/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0')

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
              click: function() {
                dataStore.clear()

                sendUpdatedDataStore()
              }
            },
            {
              label:'New Module',
              accelerator: 'CmdOrCtrl+T',
              click: function() {
                mainWindow.webContents.send('file-new-module')
              }
            },
            {
              label:'New Screen',
              accelerator: 'CmdOrCtrl+G',
              click: function() {
                mainWindow.webContents.send('file-new-screen')
              }
            },
            { type:'separator' },
            {
              label:'Open...',
              accelerator: 'CmdOrCtrl+O',
              click: function() {
                console.log('Open...');
                dialog.showOpenDialog({
                  filters: [ {name: 'Open Papyrus File', extensions: ['papyrus', 'json']} ]
                }, (files) => {
                    if (files !== undefined) {
                      dataStore.loadProjectFromPath(files[0])
                      sendUpdatedDataStore()
                    }
                });
                mainWindow.webContents.send('file-open');
              }
            },
            { type:'separator' },
            {
              label:'Save',
              accelerator: 'CmdOrCtrl+S',
              click: function() {
                console.log('Save')
                if (!!dataStore.savePath) {
                  dataStore.exportPapyrus(dataStore.savePath)
                } else {
                  saveAsFunction()
                }
              }
            },
            {
              label:'Save As...',
              accelerator: 'CmdOrCtrl+Shift+S',
              click: function() {
                console.log('Save As...');
                saveAsFunction()
              }
            },
        ]
    }
  ])
  Menu.setApplicationMenu(menu);
}

let saveAsFunction = () => {
  dialog.showSaveDialog({ message: 'Save Papyrus File' }
    ,(file) => {
    if (file !== undefined) {
      dataStore.exportPapyrus(file)
    }
  })
}

let sendUpdatedDataStore = () => {
  console.log('Sending Update...')
  mainWindow.webContents.send('refresh-project', dataStore.getProject())
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

ipcMain.on('add-module', (event, moduleName) => {
  console.log('Add Module :' + moduleName)
  dataStore.addEmptyModule(moduleName)
  sendUpdatedDataStore()
})

ipcMain.on('update-project-setting', (event, projectSetting) => {
  console.log('Update Project Setting')
  console.log(projectSetting)
  dataStore.updateProjectSetting(projectSetting)
  sendUpdatedDataStore()
})
