document.addEventListener('click', function(event) {

    // проверка, был ли клик по кнопке
    const ddValue = event.target.closest('.dropdown__value');
    if (ddValue) {
        // для поиска братского элемента '.dropdown__list' сначала находим родителя .dropdown
        const dropdown = ddValue.closest('.dropdown');
        const ddMenu = dropdown.querySelector('.dropdown__list');

        ddMenu.classList.toggle('dropdown__list_active'); // переключатель
    }

    // проверка, был ли клик по меню
    const ddLink = event.target.closest('.dropdown__link');
    if (ddLink) {
        event.preventDefault(); // Отключение ссылки

        const dropdown = ddLink.closest('.dropdown');
        const ddValue = dropdown.querySelector('.dropdown__value');
        const ddMenu = dropdown.querySelector('.dropdown__list');

        ddValue.textContent = ddLink.textContent; // Меняем текст кнопки

        ddMenu.classList.remove('dropdown__list_active'); // Закрываем меню
    }
});
