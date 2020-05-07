#!/usr/bin/env node

import axios from 'axios';
import { exec, ExecException } from 'child_process';

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
  console.log('Extension run...');

  const { data } = await client.get<CLIResponse>('/command');

  let flags = '';
  if (data.interactive) {
    for (const f of data.flags) {
      const promptResp = await client.post<string>('/prompt', f);
      flags = `${flags} --${f.name}=${promptResp.data}`;
    }
  }

  const cmdParsed = `nr1 ${data.cmd} ${flags}`;

  console.log(cmdParsed);

  // Execute the full command
  exec(cmdParsed, execCallback);
}

function execCallback(
  error: ExecException | null,
  stdout: string,
  stderr: string,
) {
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
} catch (error) {
  console.log('ERROR:', error);
}
