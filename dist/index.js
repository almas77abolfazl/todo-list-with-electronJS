"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const window_1 = __importDefault(require("./window"));
// import DataStore from './data_store'
let mainWindow, todoWindow;
let file = path.join(process.cwd(), "./dist/index.html");
let addFile = path.join(process.cwd(), "add.html");
function createMainWindow() {
    mainWindow = new window_1.default(file);
    mainWindow.once("show", () => {
        // mainWindow.webContents.send("todos", todoData.getTodos());
    });
    electron_1.ipcMain.on("add-todo-window", createTodoWindow);
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
electron_1.app.on("ready", createMainWindow);
electron_1.app.on("window-all-closed", electron_1.app.quit);
