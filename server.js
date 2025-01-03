const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const saveDataToFile = (filename, data, res) => {
  fs.writeFile(path.join(__dirname, 'data', filename), JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
    } else {
      res.send('Data saved successfully');
    }
  });
};

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для сохранения категории
app.post('/save-category', (req, res) => {
  const newCategory = {
    id: uuidv4(),
    ...req.body,
    subcategories: []
  };

  fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).send('Error reading data');
      return;
    }

    let categories = [];
    try {
      categories = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing data:', parseErr);
      res.status(500).send('Error parsing data');
      return;
    }

    categories.push(newCategory);
    saveDataToFile('categories.json', categories, res);
  });
});

// Маршрут для сохранения подкатегории
app.post('/save-subcategory', (req, res) => {
  const newSubcategory = {
    id: uuidv4(),
    ...req.body,
    items: []
  };

  fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).send('Error reading data');
      return;
    }

    let categories = [];
    try {
      categories = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing data:', parseErr);
      res.status(500).send('Error parsing data');
      return;
    }

    const category = categories.find(cat => cat.id === newSubcategory.categoryId);
    if (category) {
      category.subcategories.push(newSubcategory);
      saveDataToFile('categories.json', categories, res);
    } else {
      res.status(404).send('Category not found');
    }
  });
});

// Маршрут для сохранения объекта
app.post('/save-item', (req, res) => {
  const newItem = {
    id: uuidv4(),
    ...req.body
  };

  fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).send('Error reading data');
      return;
    }

    let categories = [];
    try {
      categories = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing data:', parseErr);
      res.status(500).send('Error parsing data');
      return;
    }

    let subcategoryFound = false;
    categories.forEach(category => {
      const subcategory = category.subcategories.find(sub => sub.id === newItem.subcategoryId);
      if (subcategory) {
        subcategory.items.push(newItem);
        subcategoryFound = true;
      }
    });

    if (subcategoryFound) {
      saveDataToFile('categories.json', categories, res);
    } else {
      res.status(404).send('Subcategory not found');
    }
  });
});

// Маршрут для удаления категории
app.delete('/delete-category/:id', (req, res) => {
  const categoryId = req.params.id;

  fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).send('Error reading data');
      return;
    }

    let categories = [];
    try {
      categories = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing data:', parseErr);
      res.status(500).send('Error parsing data');
      return;
    }

    const categoryIndex = categories.findIndex(category => category.id === categoryId);
    if (categoryIndex === -1) {
      res.status(404).send('Category not found');
      return;
    }

    categories.splice(categoryIndex, 1);
    saveDataToFile('categories.json', categories, res);
  });
});


// Маршрут для чтения всех данных
app.get('/read-data', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
      return;
    }

    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
