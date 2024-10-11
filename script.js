// Получаем элементы шагов
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

// Получаем кнопки
const nextToStep2 = document.getElementById('nextToStep2');
const nextToStep3 = document.getElementById('nextToStep3');
const backToStep2 = document.getElementById('backToStep2');

// Получаем выпадающий список выбора прошивки
const firmwareSelect = document.getElementById('firmwareSelect');

// Переход к выбору прошивки (Шаг 1 -> Шаг 2)
nextToStep2.addEventListener('click', () => {
    step1.classList.add('hidden'); // Скрываем первый шаг
    step2.classList.remove('hidden'); // Показываем второй шаг
});

// Переход к подключению устройства и прошивке (Шаг 2 -> Шаг 3)
nextToStep3.addEventListener('click', () => {
    let manifestUrl;

    // В зависимости от выбранной прошивки устанавливаем соответствующий манифест
    switch (firmwareSelect.value) {
        case 'Bruce':
            manifestUrl = 'manifest_bruce.json';
            break;
        case 'Nemo':
            manifestUrl = 'manifest_nemo.json';
            break;
        case 'Marauder':
            manifestUrl = 'manifest_marauder.json';
            break;
        case 'Shark':
            manifestUrl = 'manifest_shark.json';
            break;
    }

    // Обновляем URL манифеста для кнопки прошивки
    const installButton = document.querySelector('esp-web-install-button');
    installButton.setAttribute('manifest', manifestUrl);

    step2.classList.add('hidden'); // Скрываем второй шаг
    step3.classList.remove('hidden'); // Показываем третий шаг
});

// Переход назад к выбору прошивки (Шаг 3 -> Шаг 2)
backToStep2.addEventListener('click', () => {
    step3.classList.add('hidden');
    step2.classList.remove('hidden');
});
