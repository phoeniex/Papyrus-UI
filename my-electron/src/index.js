const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
let win;

const NODE_ENV = process.env.NODE_ENV;


function isDev() {
  return process.mainModule.filename.indexOf("app.asar") === -1 && NODE_ENV === "development";
}
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  if (isDev()) {
    win.loadURL("http://localhost:4200");
    win.webContents.on("did-fail-load", event => {
      win.reload();
    });
    win.webContents.openDevTools();
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "../../dist/ng-electron1/index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }
  win.on("closed", () => {
    win = null;
  });
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
