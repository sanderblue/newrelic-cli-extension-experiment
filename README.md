# newrelic-cli-extension-experiment
Temporary repository to prototype building extensions for the New Relic CLI using HTTP as the transport and also written in a different language from the CLI (which is built in Go). In this case we're prototyping writing an extension in TypeScript/JavaScript using Node.

**Quick start**
Clone the repo into the preconfigured CLI extensions directory.
```bash
git clone github.com:sanderblue/newrelic-cli-extension-experiment.git ~/.newrelic/extensions/<your-extension-name>
```

If using TypeScript*, make sure it's installed or run the command below.
```bash
npm install -g typescript
```
<sup>*Note: If you prefer to write plain JavaScript, feel free to edit `index.js` directly.</sup>

Navigate to the extension directory.
```bash
cd ~/.newrelic/extensions/<your extension name>
```

Install dependencies
```bash
npm install
```

Compile TypeScript and watch for file changes
```
tsc --watch
```
