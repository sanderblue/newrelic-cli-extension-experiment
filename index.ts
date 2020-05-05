#!/usr/bin/env node

import * as http from 'http';
import axios from 'axios';

interface CLIResponse {
  Cmd: string;
  Args: string[];
  Flags: {
    [key: string]: string;
  };
}

async function run() {
  http
    .get('http://localhost:8080', (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error: Error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          'Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`,
        );
      }

      if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');

      let rawData = '';
      res.on('data', (chunk) => {
        console.log('res.on - data:', chunk);

        rawData += chunk;
      });

      res.on('end', (a) => {
        console.log('res.on - end: ', a);

        try {
          const parsedData = JSON.parse(rawData);
          console.log('res parsed data:', parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
}

try {
  run();
} catch (error) {
  console.log('ERROR:', error);
}

// const client = axios.create({
//   baseURL: 'http://localhost:8080',
// });

// async function run(): Promise<void> {
//   console.log('Node - making HTTP request');

//   const resp = await client.get<CLIResponse>('');

//   // resp.data will be typed based on the
//   // provided CLIResponse interface
//   console.log("");
//   console.log('Node - resp:', resp.data);
// }

// try {
//   run();
// } catch (error) {
//   console.log('ERROR:', error);
// }
