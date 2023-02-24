# Web crawler using NodeJs/Express - MongoDB
- The tool can read package manager configuration files (npm, maven ..) of web development projects to collect information about the dependencies of these pahanf components.
Tool to collect (crawler) data from public projects on github
- The tool can receive a URL then send a request and parse the HTML returned by an active web system to collect js, img, ... files according to that web system's functional module

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
git clone https://github.com/hoanlv214/web-crawler-nodejs-mongodb.git
cd web-crawler-nodejs-mongodb
npm install
```

## Usage

```javascript
npm start 
visit: (http://localhost:3000)
```
## Feature
- Get package.json from public repositories github by URL
```
node app.js
```
- Get all static file from any URL
```
npm start
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
