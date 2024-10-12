// Получаем элементы шагов
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');

// Получаем кнопки
const nextToStep2 = document.getElementById('nextToStep2');
const backToStep1 = document.getElementById('backToStep1');

// Получаем выпадающие списки выбора устройства и прошивки
const deviceSelect = document.getElementById('deviceSelect');
const firmwareSelect = document.getElementById('firmwareSelect');

// Объект с прошивками для каждого устройства
const firmwareOptions = {
    M5StickCPlus2: ['Bruce', 'Nemo', 'Marauder', 'Shark'],
    NodeMCU_ESP8266: ['Deauther']
};

// Функция для обновления списка прошивок в зависимости от выбранного устройства
function updateFirmwareOptions() {
    const selectedDevice = deviceSelect.value;
    firmwareSelect.innerHTML = '';

    firmwareOptions[selectedDevice].forEach(firmware => {
        const option = document.createElement('option');
        option.value = firmware;
        option.textContent = firmware;
        firmwareSelect.appendChild(option);
    });
}

// Изначально обновляем список прошивок для выбранного по умолчанию устройства
updateFirmwareOptions();

// Обновляем прошивки при смене устройства
deviceSelect.addEventListener('change', updateFirmwareOptions);

// Переход к подключению устройства и прошивке (Шаг 1 -> Шаг 2)
nextToStep2.addEventListener('click', () => {
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
    } else if (device === 'NodeMCU_ESP8266' && firmware === 'Deauther') {
        manifestUrl = 'manifest_deauther.json';
    }

    // Обновляем URL манифеста для кнопки прошивки
    const installButton = document.querySelector('esp-web-install-button');
    installButton.setAttribute('manifest', manifestUrl);

    step1.classList.add('hidden'); // Скрываем первый шаг
    step2.classList.remove('hidden'); // Показываем второй шаг
});

// Переход назад к выбору устройства и прошивки (Шаг 2 -> Шаг 1)
backToStep1.addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
});
