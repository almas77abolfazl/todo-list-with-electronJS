"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = __importDefault(require("electron"));
const window_1 = __importDefault(require("./window"));
let mainWindow, todoWindow;
let file = `${__dirname}/index.html`;
let addFile = `${__dirname}/gui/ADD_LIST.html`;
function createMainWindow() {
    mainWindow = new window_1.default(file);
    mainWindow.webContents.send("updateHTML", true);
    electron_1.default.ipcMain.on("add-list", createTodoWindow);
}
function createTodoWindow() {
    if (!todoWindow) {
        todoWindow = new window_1.default(addFile, {
            width: 200,
            height: 200,
            parent: mainWindow,
            frame: false,
        });
        todoWindow.on("closed", () => {
            todoWindow = null;
        });
        todoWindow.removeMenu();
    }
}
electron_1.default.app.on("ready", createMainWindow);
electron_1.default.app.on("window-all-closed", electron_1.default.app.quit);
