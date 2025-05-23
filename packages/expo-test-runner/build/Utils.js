"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
exports.yarnInstall = yarnInstall;
exports.killEmulatorAsync = killEmulatorAsync;
exports.killSimulatorAsync = killSimulatorAsync;
exports.killVirtualDevicesAsync = killVirtualDevicesAsync;
const spawn_async_1 = __importDefault(require("@expo/spawn-async"));
const child_process_1 = require("child_process");
const Platform_1 = require("./Platform");
function yarnInstall(path) {
    (0, child_process_1.spawnSync)('yarn', ['install', '--silent'], { stdio: 'inherit', cwd: path });
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.delay = delay;
async function killEmulatorAsync() {
    try {
        console.log('Trying to kill emulator...');
        await (0, spawn_async_1.default)('adb', ['-s', 'emulator-5554', 'emu', 'kill'], { stdio: 'inherit' });
        console.log('Emulator was killed.');
    }
    catch (e) {
        console.log("Couldn't kill emulator");
        console.log(e);
    }
}
async function killSimulatorAsync() {
    try {
        console.log('Trying to kill simulator...');
        await (0, spawn_async_1.default)('xcrun', ['simctl', 'shutdown', 'all'], { stdio: 'inherit' });
        console.log('Simulator was killed.');
    }
    catch (e) {
        console.log("Couldn't kill simulator.");
        console.log(e);
    }
}
async function killVirtualDevicesAsync(platform) {
    if ((platform & Platform_1.Platform.Android) > 0) {
        await killEmulatorAsync();
    }
    if ((platform & Platform_1.Platform.iOS) > 0) {
        await killSimulatorAsync();
    }
}
//# sourceMappingURL=Utils.js.map