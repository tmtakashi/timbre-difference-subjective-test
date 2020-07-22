const electron = require("electron");
const { dialog, ipcMain, IpcMainEvent } = require("electron");
const fs = require("fs");
const path = require("path");

electron.BrowserWindow;
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

  win.loadFile(path.join(__dirname, "./index.html"));
}

electron.app.whenReady().then(() => {
  createWindow();
});

electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});

electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("request-select-save-dir", (): string => {
  const path = dialog
    .showOpenDialog(win, {
      properties: ["openDirectory"],
    })
    .then((result: any) => {
      if (!result.canceled) {
        const path = result.filePaths[0];
        return path;
      }
    })
    .catch((err: Error) => {
      console.log(err);
    });
  return path;
});

ipcMain.handle("request-save-file", (event: typeof IpcMainEvent, arg: any) => {
  const dataFilePath = `${arg.dataPath}/${arg.participant}.json`;
  fs.writeFileSync(dataFilePath, JSON.stringify([]), (err: Error) => {
    if (err) {
      dialog.showErrorBox("Error", err.message);
      return { goNext: false };
    }
  });
  return { goNext: true, dataFilePath };
});

ipcMain.on("request-production-wav-list", (event: any, arg: any) => {
  dialog
    .showOpenDialog(win, {
      properties: ["openDirectory"],
    })
    .then((result: any) => {
      if (!result.canceled) {
        const fileList = fs
          .readdirSync(result.filePaths[0])
          .filter((file: string) => {
            return path.extname(file).toLowerCase() === ".wav";
          });
        const fullPathFileList = fileList.map((file: string) => {
          return result.filePaths[0] + "/" + file;
        });
        event.reply("production-wav-list-reply", fullPathFileList);
        return;
      }
    })
    .catch((err: any) => {
      dialog.showErrorBox("Error", err);
    });
});

ipcMain.on("write-value-to-file", (event: any, arg: any) => {
  const json = JSON.parse(fs.readFileSync(arg.dataPath, "utf8"));
  json.push({
    A: arg.aFileName,
    B: arg.bFileName,
    value: arg.value,
  });
  fs.writeFileSync(arg.dataPath, JSON.stringify(json, null, 4));
});
