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
        console.log('Node:Run');
        const { data } = yield client.get('/command');
        console.log('Node:Command:', JSON.stringify(data, null, 2));
        let flags = {};
        if (data.interactive) {
            for (const f of data.flags) {
                const promptResp = yield client.post('/prompt', f);
                console.log('Node:Prompt:', promptResp.data);
                flags[`--${f.name}`] = promptResp.data;
            }
        }
        child_process_1.exec(`nr1 `);
        // const response = await client.post('/exec', {
        //   cmd: data.cmd,
        //   flags: flags,
        // });
        // console.log('Node:exec:', response);
    });
}
try {
    run();
}
catch (error) {
    console.log('ERROR:', error);
}
