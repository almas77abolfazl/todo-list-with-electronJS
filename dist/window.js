"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const defaultProps = {
    width: 800,
    height: 800,
    show: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
    },
};
class Window extends electron_1.BrowserWindow {
    constructor(file, windowSettings) {
        super(Object.assign(Object.assign({}, defaultProps), windowSettings)); //  must be a objet cause browser construct is a object
        this.loadFile(file);
        this.once("ready-to-show", this.show);
    }
}
exports.default = Window;
