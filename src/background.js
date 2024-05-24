'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import axios from 'axios';

const base_url = "http://127.0.0.1:6444";
const type1 = "/tPayDaemon/Auth";

const ckDaemon = async (data) => {
  console.log('a');
    const url = base_url + type1;
    return await axios.post(url, data)
    .then((response) => {
        //console.log(response.data);
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    });
};

const getTime_YYMMDDHHMMSS = () => {
  let today = new Date();

  let year = today.getFullYear()
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
          
  let hours = ('0' + today.getHours()).slice(-2);
  let minutes = ('0' + (today.getMinutes() + 1)).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2);
  
  let time = year + month + day + hours + minutes + seconds;
  
  return time.slice(-12);		
};

let data4 = {
    TIMEOUT: '02',
    MSGTYPE: '1010',
    TID: '1004930001',
    MSGNO: '000000000001',
    TRANSTIME: '240524206052',
    INSTALLMENT: '00',
    AMOUNT: '000000000',
    TAX: '000000000',
    SERVICE: '000000000',
    CURRENCY: 'KRW',
    NOTAX: '000000000',
    SIGNKBN: ' ',
    CR: String.fromCharCode(0x0d),
};

const proc = async () => {
    const ck = await ckDaemon(data4);
    console.log(ck);
    return ck;
}

ipcMain.on('synchronous-message', async (event, arg) => {
  console.log(arg);

  data4.TRANSTIME = getTime_YYMMDDHHMMSS();
  data4.AMOUNT = arg.AMOUNT;
  data4.MSGNO = arg.MSGNO;
  const rt = await proc();
  
  event.returnValue = JSON.stringify(rt);
  
});




// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 700,
    height: 1100,
    autoHideMenuBar: true,
    fullscreen: true,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}



