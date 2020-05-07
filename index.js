#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const child_process_1 = require("child_process");
const client = axios_1.default.create({
    baseURL: 'http://localhost:8080',
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Extension run...');
        const { data } = yield client.get('/command');
        let flags = '';
        if (data.interactive) {
            for (const f of data.flags) {
                const promptResp = yield client.post('/prompt', f);
                flags = `${flags} --${f.name}=${promptResp.data}`;
            }
        }
        const cmdParsed = `nr1 ${data.cmd} ${flags}`;
        console.log(cmdParsed);
        // Execute the full command
        child_process_1.exec(cmdParsed, execCallback);
    });
}
function execCallback(error, stdout, stderr) {
    if (error) {
        console.error('Error:', JSON.stringify(error, null, 2));
        return;
    }
    if (stderr) {
        console.error(stderr);
    }
    console.log('stdout:', stdout);
}
try {
    run();
}
catch (error) {
    console.log('ERROR:', error);
}
