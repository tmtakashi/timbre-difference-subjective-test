const electron = require('electron');
const { dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

let win: any;
// eslint-disable-next-line require-jsdoc
function createWindow() {
  win = new electron.BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const path = require('path');
  win.loadFile(path.join(__dirname, './index.html'))
};

electron.app.whenReady().then(createWindow);

electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});

electron.app.on('activate', () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('request-save-file', (event: any, arg: any[]) => {
  dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  }).then((result: any) => {
    if (!result.canceled) {
      fs.writeFile(result.filePaths[0] + `/${arg}.txt`, '', (err: any) => {
        if (err) {
          dialog.showErrorBox("Error", err)
        }
        event.reply('save-file-reply', 'next');
      });
      return;
    }
    event.reply('save-file-reply', 'stay');
  }).catch((err: any) => {
    dialog.showErrorBox("Error", err)
    event.reply('save-file-reply', 'stay');
  })
  
});

ipcMain.on('request-production-wav-list', (event: any, arg: any[]) => {
  dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  }).then((result: any) => {
    if (!result.canceled) {
      const fileList = fs.readdirSync(result.filePaths[0])
        .filter((file: string) => {
          return path.extname(file).toLowerCase() === '.wav'
        })
      const fullPathFileList = fileList.map((file: string) => {
        return result.filePaths[0] + '/' + file;
      });
      event.reply('production-wav-list-reply', fullPathFileList);
      return;
    }
  }).catch((err: any) => {
    dialog.showErrorBox("Error", err)
  })
})