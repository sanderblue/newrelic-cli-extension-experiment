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
const client = axios_1.default.create({
    baseURL: 'http://localhost:8080',
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Node - making HTTP request');
        const { data } = yield client.get('/command');
        console.log('Node - cmdResp:', JSON.stringify(data, null, 2));
        if (data.interactive) {
            for (const f of data.flags) {
                const promptResp = yield client.post('/prompt', {
                    options: f.options,
                    prompt: f.prompt,
                });
                console.log('Node - promptResp', promptResp.data);
            }
        }
    });
}
try {
    run();
}
catch (error) {
    console.log('ERROR:', error);
}
