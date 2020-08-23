const { app, BrowserWindow } = require('electron');
const path = require('path');

function CreateWindow() 
{
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        titleBarStyle: 'hidden',
        frame: false,
    });

    mainWindow.loadFile(path.join(__dirname, 'views/index.html'));
    mainWindow.webContents.openDevTools({ mode: "detach"} );
}

app.whenReady().then(() => {
    
    CreateWindow();

    app.on('activate', function() {
        if(BrowserWindow.getAllWindows().length === 0)
            CreateWindow();
    });
});

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin')
        app.quit();
});