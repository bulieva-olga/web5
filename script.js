// ============================================================
// ПОЧТА: письмо + тема + сохранение
// ============================================================

const input = document.getElementById('input');
const result = document.getElementById('result');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const themeButtons = document.querySelectorAll('[data-theme]');

// ============================================================
// 1. ТЕМА ОФОРМЛЕНИЯ
// ============================================================

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);   // сохраняем выбор
}

// Навешиваем обработчики на кнопки тем
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setTheme(btn.dataset.theme);
    });
});

// Восстанавливаем тему при загрузке страницы
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
});

// ============================================================
// 2. ОТПРАВКА ПИСЬМА
// ============================================================

sendBtn.addEventListener('click', () => {
    const text = input.value.trim();

    if (text === '') {
        alert('Введите текст письма!');
        return;
    }

    // Сохраняем письмо в localStorage
    localStorage.setItem('letter', text);
    localStorage.setItem('letterDate', new Date().toLocaleString('ru-RU'));

    // Показываем «отправлено»
    const date = new Date().toLocaleString('ru-RU');
    result.textContent = `✅ Письмо отправлено (${date}):\n\n${text}`;

    // Очищаем поле
    input.value = '';
});

// ============================================================
// 3. ОЧИСТКА
// ============================================================

clearBtn.addEventListener('click', () => {
    if (!confirm('Удалить письмо?')) return;

    localStorage.removeItem('letter');
    localStorage.removeItem('letterDate');
    input.value = '';
    result.textContent = 'Письмо удалено';
});

// ============================================================
// 4. ВОССТАНОВЛЕНИЕ ПИСЬМА ПРИ ЗАГРУЗКЕ
// ============================================================

window.addEventListener('load', () => {
    const savedLetter = localStorage.getItem('letter');
    const savedDate = localStorage.getItem('letterDate');

    if (savedLetter) {
        result.textContent = `📬 Последнее письмо (${savedDate}):\n\n${savedLetter}`;
    }
});