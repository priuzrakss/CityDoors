const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const saveDataToFile = (filename, newData, res) => {
  fs.readFile(path.join(__dirname, 'data', filename), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).send('Error reading data');
      return;
    }

    let jsonData = [];

    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing data:', parseErr);
      res.status(500).send('Error parsing data');
      return;
    }

    jsonData.push(newData);

    fs.writeFile(path.join(__dirname, 'data', filename), JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Error saving data');
      } else {
        res.send('Data saved successfully');
      }
    });
  });
};

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для сохранения категории
app.post('/save-category', (req, res) => {
  saveDataToFile('categories.json', req.body, res);
});

// Другие маршруты

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
