const express = require('express');
const getRepoPackageJson = require('get-repo-package-json');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>GitHub Crawler</title>
      </head>
      <body>
        <h1>GitHub Crawler</h1>
        <form>
          <label for="url">GitHub URL:</label>
          <input type="text" id="url" name="url"><br><br>
          <button type="submit" onclick="submitForm()">Submit</button>
        </form>
        <script>
          function submitForm() {
            event.preventDefault();
            const url = document.getElementById('url').value;
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/save-url');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
              if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                alert('URL saved successfully');
              }
            }
            xhr.send(JSON.stringify({ url: url }));
          }
        </script>
      </body>
    </html>
  `);
});

app.post('/save-url', async (req, res) => {
    const { url } = req.body;
    try {
        const packageJson = await getRepoPackageJson(url);
        await client.connect();
        const db = client.db('mydb');
        const collection = db.collection('packages');
        await collection.insertOne(packageJson);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        await client.close();
    }
});

app.listen(3001, () => console.log('Server listening on port 3001'));
