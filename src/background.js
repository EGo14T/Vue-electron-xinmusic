'use strict'

import { app, protocol, BrowserWindow, ipcMain ,Tray, Menu } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

let tray

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'xinmusic', privileges: { secure: true, standard: true } }])

// electron打开本地图片时，替换file:///
app.whenReady().then(() => {
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = request.url.replace('file:///', '');
    callback(pathname);
  });
});

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ 
    width: 1080, 
    height: 670, 
    resizable: true,
    skipTaskbar: false,
    frame: false,
    backgroundColor: '#2e2c29',
    webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true,
    webSecurity: false
  } })


  //禁用状态栏右键菜单
  win.hookWindowMessage(278, function(e){
    win.setEnabled(false);//窗口禁用
    setTimeout(() => {
    win.setEnabled(true);//窗口启用
    }, 10);//延时太快会立刻启用，太慢会妨碍窗口其他操作，可自行测试最佳时间
    return true;
    })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('xinmusic')
    // Load the index.html when not in development
    win.loadURL('xinmusic://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  ipcMain.on('close', () => {
    win.close()
  })

  ipcMain.on('minwindow', () => {
    win.minimize()
  })

  ipcMain.on('minToTask', ()=> {
    win.hide()
  })

  // ipcMain.on('minMax',()=>{
  //   console.log(win.isMaximized())
  //   if(win.isMaximized()){
  //     win.unmaximize();
  //   }else{
  //     win.maximize();
  //   }
  // })

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
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  tray = new Tray(`${__static}/bitbug_favicon.ico`);
  const contextMenu = Menu.buildFromTemplate([
    { label: '上一首',click:function(){
      win.webContents.send('lastMusic')
    }},
    { label: '下一首',click:function(){
      win.webContents.send('nextMusic')
    }},
    { label: '退出',click:function(){
      app.quit();
    }},
  ])
  tray.setToolTip('昕音乐')
  tray.setContextMenu(contextMenu)

  tray.on('click', function (Event) {
    win.show() // 显示窗口
     // 是否最小到托盘
})

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
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
