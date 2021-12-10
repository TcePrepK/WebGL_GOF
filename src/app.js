const electron = require("electron");
const path = require("path");

function createWindow() {
    // Create the browser window.
    const mainWindow = new electron.BrowserWindow({
        width: 1280,
        height: 800,
        show: false,
        backgroundColor: "#222428",
        useContentSize: true,
        minWidth: 800,
        minHeight: 600,
        title: "no name yet",
        transparent: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(electron.app.getAppPath(), "preload.js"),
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
        },
    });

    mainWindow.loadURL("http://localhost:3005");

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../src/index.html"));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
        mainWindow.focus();
    });
}

electron.app.on("ready", () => {
    createWindow();

    electron.app.on("activate", function () {
        if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

electron.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron.app.quit();
    }
});

// function createWindow() {
//     let win = new BrowserWindow({
//         width: 1280,
//         height: 800,
//         show: false,
//         backgroundColor: "#222428",
//         useContentSize: true,
//         minWidth: 800,
//         minHeight: 600,
//         title: "shapez.io Standalone",
//         transparent: false,
//         autoHideMenuBar: true,
//         webPreferences: {
//             nodeIntegration: true,
//             webSecurity: false,
//         },
//     });

//     win.loadURL("http://localhost:3005");

//     win.webContents.session.clearCache();
//     win.webContents.session.clearStorageData();

//     win.webContents.on("new-window", (event, pth) => {
//         event.preventDefault();
//         shell.openExternal(pth);
//     });

//     win.on("closed", () => {
//         console.log("Window closed");
//         win = null;
//     });

//     Menu.setApplicationMenu(null);

//     win.once("ready-to-show", () => {
//         win.show();
//         win.focus();
//     });
// }
