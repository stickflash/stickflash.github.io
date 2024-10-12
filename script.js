// Получаем элементы шагов
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

// Получаем кнопки
const nextToStep2 = document.getElementById('nextToStep2');
const nextToStep3 = document.getElementById('nextToStep3');
const backToStep1 = document.getElementById('backToStep1');
const backToStep2 = document.getElementById('backToStep2');

// Получаем выпадающие списки выбора устройства и прошивки
const deviceSelect = document.getElementById('deviceSelect');
const firmwareSelect = document.getElementById('firmwareSelect');

// Прошивки для M5StickC Plus2 и NodeMCU ESP8266
const firmwareOptions = {
    M5StickCPlus2: ['Bruce', 'Nemo', 'Marauder', 'Shark'],
    NodeMCU_ESP8266: ['Deauther']
};

// Переход к выбору прошивки (Шаг 1 -> Шаг 2)
nextToStep2.addEventListener('click', () => {
    updateFirmwareOptions();
    step1.classList.add('hidden'); // Скрываем первый шаг
    step2.classList.remove('hidden'); // Показываем второй шаг
});

// Функция для обновления списка прошивок
function updateFirmwareOptions() {
    firmwareSelect.innerHTML = '';
    const selectedDevice = deviceSelect.value;

    firmwareOptions[selectedDevice].forEach(firmware => {
        const option = document.createElement('option');
        option.value = firmware;
        option.textContent = firmware;
        firmwareSelect.appendChild(option);
    });
}

// Переход к подключению устройства и прошивке (Шаг 2 -> Шаг 3)
nextToStep3.addEventListener('click', () => {
    let manifestUrl;

    // В зависимости от выбранной прошивки устанавливаем соответствующий манифест
    const firmware = firmwareSelect.value;
    const selectedDevice = deviceSelect.value;

    if (selectedDevice === 'M5StickCPlus2') {
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
    } else if (selectedDevice === 'NodeMCU_ESP8266' && firmware === 'Deauther') {
        manifestUrl = 'manifest_deauther.json';
    }

    // Обновляем URL манифеста для кнопки прошивки
    const installButton = document.querySelector('esp-web-install-button');
    installButton.setAttribute('manifest', manifestUrl);

    step2.classList.add('hidden'); // Скрываем второй шаг
    step3.classList.remove('hidden'); // Показываем третий шаг
});

// Переход назад к выбору устройства (Шаг 2 -> Шаг 1)
backToStep1.addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
});

// Переход назад к выбору прошивки (Шаг 3 -> Шаг 2)
backToStep2.addEventListener('click', () => {
    step3.classList.add('hidden');
    step2.classList.remove('hidden');
});
