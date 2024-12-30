document.addEventListener("DOMContentLoaded", function(){
  const container = document.getElementById("search-tree-container");
  const contextMenu = document.getElementById("context-menu");

  
  container.addEventListener("contextmenu", function(e){
    e.preventDefault();
    contextMenu.style.display = "block";
  });

  document.addEventListener("click", function(e){
    if(e.target.closest("#context-menu") === null){
      contextMenu.style.display = "none";
    }
  });
});

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






categoryInit();
