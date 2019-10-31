# JSON Porter

Export any JavaScript object as a JSON file download or upload a JSON file to import a JavaScript object. This is intended to be used within the contexted of a web browser, not within node.js since there are much better ways to do this in node.

## Example Usage

### JavaScript
```javascript

var JsonPorter = require('json-porter');              // Import library

let obj = new Object();                               // Have an object
obj.name = 'Object';
obj.desc = 'Hello World';
obj.tags = [ 'JavaScript', 'Download', 'Upload' ]; 

var jp = new JsonPorter();                            // Instantiate json-porter

jp.export(obj, 'MyObjectFilename.json');              // Download JSON file

var obj2;

jp.import().then(function (o) {                       // Open file selection dialog and upload a file
    obj2 = o;                                         // Recieve parsed JSON object 
});

```

### TypeScript
```typescript
import JsonPorter from 'json-porter';                 // Import library

let obj: any = new Object();                          // Have an object
obj.name = 'Object';
obj.desc = 'Hello World';
obj.tags = [ 'JavaScript', 'Download', 'Upload' ]; 

let jp = new JsonPorter<any>();                       // Instantiate json-porter

jp.export(obj, 'MyObjectFilename.json');              // Download JSON file

let obj2 = await jp.import();                         // Open file dialog and upload a file 
                                                      // to receive parsed JSON object

```

### JSON File
This example would produce a JSON file with these contents which you could then import the file to reconstitute a clone of the original object.

>MyObjectFilename.json
```json
{
  "name": "Object",
  "desc": "Hello World",
  "tags": [
    "JavaScript",
    "Download",
    "Upload"
  ]
}

```

## Building the code
```shell
# download & install dependencies
npm install

# Transpiles TypeScript, generates source map files & TypeScript type declaration files  
npm run build

# Deletes all build output
npm run clean

```

> Who is Jason Porter? -My wife