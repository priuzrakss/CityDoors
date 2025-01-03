document.addEventListener("DOMContentLoaded", function(){
  const container = document.getElementById("search-tree-container");
  const contextMenu = document.getElementById("context-menu");
  const deleteMenu = document.getElementById("delete-menu");
  container.addEventListener("contextmenu", function(e){
    e.preventDefault();
    let target = e.target;
    if(target.classList.contains("category-element")){
      contextMenu.style.left = e.pageX + "px";
      contextMenu.style.top = e.pageY + "px";
      contextMenu.style.display = "block";
      deleteMenu.style.display = "block";
      //console.log(e);
      console.log(e.target.classList.contains);
    }
    else{
      contextMenu.style.left = e.pageX + "px";
      contextMenu.style.top = e.pageY + "px";
      contextMenu.style.display = "block";
    }
    
  });

  document.addEventListener("click", function(e) {
    if (e.target.closest("#contextMenu") === null) {  // Проверяем, не находится ли кликнутый элемент внутри контекстного меню
      contextMenu.style.display = "none";  // Скрываем контекстное меню
      deleteMenu.style.display = "none";
    }
  });
  
  
});

function loadItems() {
  const fetchData = () => {
    fetch('/read-data')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data);
        displayData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const displayData = (data) => {
    const container = document.getElementById('search-tree');
    container.innerHTML = '';

    data.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.innerHTML = `<h2>${category.name}</h2>`;
      categoryElement.className = "category-element"
      categoryElement.id = `${category.id}`;
      container.appendChild(categoryElement);
    });
  };

  // Вызов функции fetchData для запроса данных
  fetchData();
}


function categoryInit(){
  const nameCategory = document.createElement("input");
  nameCategory.type = "text";
  nameCategory.placeholder = "Название категории";
  nameCategory.className = "category-name";
  nameCategory.id = "category-name";

  const submitButton = document.createElement("button");
  submitButton.id = "category-submit";
  submitButton.className =  "category-submit";
  submitButton.type = "submit";
  submitButton.textContent = "Создать";
  submitButton.onclick = addCategory;

  const CategoryContiner = document.getElementById("category-display");
  CategoryContiner.style.display = "none"
  
  CategoryContiner.appendChild(nameCategory);
  CategoryContiner.appendChild(submitButton);
}

function createCategory(){
  document.getElementById("category-display").style.display = "flex";
  document.getElementById("context-menu").style.display = "none"
}

function addCategory(){
  const CategoryContiner = document.getElementById("category-display");
  CategoryContiner.style.display = "none";
  // Обработка формы добавления категории
  event.preventDefault(); // Предотвращаем стандартное поведение формы
  alert("alert");
  const categoryData = {
    name: document.getElementById('category-name').value
  };
  if(categoryData.name === ""){
    return;
  }
  else{
    fetch('/save-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoryData)
    })
    .then(response => response.text())
    .then(result => {
      console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  location.reload();
}

categoryInit();
loadItems();