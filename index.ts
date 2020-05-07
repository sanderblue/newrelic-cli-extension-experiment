#!/usr/bin/env node

import * as http from 'http';
import axios from 'axios';

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
  console.log('Node - making HTTP request');

  const { data } = await client.get<CLIResponse>('/command');

  console.log('Node - cmdResp:', JSON.stringify(data, null, 2));

  if (data.interactive) {
    for (const f of data.flags) {
      const promptResp = await client.post('/prompt', {
        options: f.options,
        prompt: f.prompt,
      });

      console.log('Node - promptResp', promptResp.data);
    }
  }
}

try {
  run();
} catch (error) {
  console.log('ERROR:', error);
}
