#!/usr/bin/env node

import axios from 'axios';
import { exec } from 'child_process';

interface Flag {
  name: string;
  value: string;
  options: string[];
  prompt: string;
}

interface CLIResponse {
  cmd: string;
  args: string[];
  flags: Flag[];
  interactive: boolean;
}

const client = axios.create({
  baseURL: 'http://localhost:8080',
});

async function run(): Promise<void> {
  console.log('Node:Run');

  const { data } = await client.get<CLIResponse>('/command');

  console.log('Node:Command:', JSON.stringify(data, null, 2));

  let flags = {};
  if (data.interactive) {
    for (const f of data.flags) {
      const promptResp = await client.post<string>('/prompt', f);

      console.log('Node:Prompt:', promptResp.data);

      flags[`--${f.name}`] = promptResp.data;
    }
  }

  exec(`nr1 `);
  // const response = await client.post('/exec', {
  //   cmd: data.cmd,
  //   flags: flags,
  // });
  // console.log('Node:exec:', response);
}

try {
  run();
} catch (error) {
  console.log('ERROR:', error);
}
