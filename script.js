// Получаем элементы шагов
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const ev3Instructions = document.getElementById('ev3Instructions');

// Получаем кнопки
const nextToStep2 = document.getElementById('nextToStep2');
const nextToStep3 = document.getElementById('nextToStep3');
const backToStep1 = document.getElementById('backToStep1');
const backToStep2 = document.getElementById('backToStep2');

// Получаем выпадающие списки выбора устройства и прошивки
const deviceSelect = document.getElementById('deviceSelect');
const firmwareSelect = document.getElementById('firmwareSelect');

// Переход к выбору прошивки (Шаг 1 -> Шаг 2)
nextToStep2.addEventListener('click', () => {
    step1.classList.add('hidden'); // Скрываем первый шаг
    step2.classList.remove('hidden'); // Показываем второй шаг

    // Проверяем, выбрано ли устройство EV3
    if (deviceSelect.value === 'EV3' && firmwareSelect.value === 'Micropython') {
        ev3Instructions.classList.remove('hidden'); // Показываем инструкции для EV3
        document.querySelector('esp-web-install-button').classList.add('hidden'); // Скрываем кнопку прошивки
    } else {
        ev3Instructions.classList.add('hidden'); // Скрываем инструкции для EV3
        document.querySelector('esp-web-install-button').classList.remove('hidden'); // Показываем кнопку прошивки
    }
});

// Переход к подключению устройства и прошивке (Шаг 2 -> Шаг 3)
nextToStep3.addEventListener('click', () => {
    let manifestUrl;

    // В зависимости от выбранного устройства и прошивки устанавливаем соответствующий манифест
    const device = deviceSelect.value;
    const firmware = firmwareSelect.value;

    if (device === 'M5StickCPlus2') {
        switch (firmware) {
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
    } else if (device === 'NodeMCU_ESP8266') {
        if (firmware === 'Deauther') {
            manifestUrl = 'manifest_deauther.json';
        }
    }

    // Обновляем URL манифеста для кнопки прошивки
    const installButton = document.querySelector('esp-web-install-button');
    installButton.setAttribute('manifest', manifestUrl);

    step2.classList.add('hidden'); // Скрываем второй шаг
    step3.classList.remove('hidden'); // Показываем третий шаг
});

// Переход назад к выбору устройства и прошивки (Шаг 2 -> Шаг 1)
backToStep1.addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
});

// Переход назад к выбору прошивки (Шаг 3 -> Шаг 2)
backToStep2.addEventListener('click', () => {
    step3.classList.add('hidden');
    step2.classList.remove('hidden');
});
