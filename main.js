const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ngrok = require('ngrok');
const server = require('./main/server');

let mainWindow = null;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nodeIntegration: true,
      preload: path.join(__dirname, 'app/preload/index.js')
    }
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('ready', () => {
  // mainWindow.webContents.openDevTools();
});

app.on('window-all-closed', async () => {
  try {
    await teardownServer();
  } catch(err) {
    console.log('erro ao tentar fechar a app', err);
  } finally {
    app.quit();
  }
});

let aboutWindow = null;
ipcMain.on('open-about-window', () => {
  if(aboutWindow === null) {
    aboutWindow = new BrowserWindow({
      width: 300,
      height: 200,
      alwaysOnTop: true,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'app/preload/about.js')
      }
    });

    aboutWindow.on('closed', () => {
      aboutWindow = null;
    });
  }

  aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

ipcMain.on('close-about-window', () => {
  aboutWindow.close();
});

// ipcMain.on('test', () => {
//   console.log('chegou test no ipcmain!');
// });

const test5 = text => {
  return Promise.resolve(text);
};

const test6 = async () => {
  const text = await test5('testando 12345');
  console.log(text);
};

test6();

const connectNgrok = async () => {
  try {
    console.log('conectando ngrok…');
    const url = await ngrok.connect({
      addr: 8080,
      authtoken: '1StL3sIccfR624Uc3BGV36XA0qG_6cAMMYFdKtPjtWax3AHSK'
    });

    console.log('connected at:', url);
  } catch(err) {
    console.log('erro na conexão ngrok', err);
  } finally {
    // disconnectNgrok();
  }
};

const disconnectNgrok = async () => {
  try {
    await ngrok.disconnect();
    console.log('disconnected');
  } catch(err) {
    console.log('erro na desconexão ngrok', err);
  }
};

const startExternalServer = () => {
  server();
  connectNgrok();
};

const teardownServer = async () => {
  await disconnectNgrok();
};

startExternalServer();