// Функция для установки темы
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
}

// Чтение темы из локального хранилища при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light-theme';
  setTheme(savedTheme);
  toggleThemeIcon(savedTheme);
});

// Функция для переключения видимости изображений
function toggleThemeIcon(theme) {
  const lightIcon = document.getElementById('light-theme-icon');
  const darkIcon = document.getElementById('dark-theme-icon');
  if (theme === 'dark-theme') {
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'block';
  } else {
    lightIcon.style.display = 'block';
    darkIcon.style.display = 'none';
  }
}

// Обработчик для смены темы
document.getElementById('theme-toggle').addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
  setTheme(currentTheme);
  toggleThemeIcon(currentTheme);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => {
      console.log('Service Worker зарегистрирован');
    })
    .catch((error) => {
      console.error('Ошибка регистрации Service Worker:', error);
    });
}

fetch('http://localhost:3000/data')
  .then(response => response.json())
  .then(data => {
    console.log('Данные:', data);
  })
  .catch(error => {
    console.error('Ошибка получения данных:', error);
  });
