const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Настройка для обслуживания статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint для получения данных
app.get('/data', (req, res) => {
  const dataPath = path.join(__dirname, 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка чтения данных');
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint для сохранения данных
app.post('/data', (req, res) => {
  const dataPath = path.join(__dirname, 'data.json');
  fs.writeFile(dataPath, JSON.stringify(req.body), err => {
    if (err) {
      return res.status(500).send('Ошибка записи данных');
    }
    res.send('Данные сохранены');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
