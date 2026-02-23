export default class Popover {
    constructor() {
        this._popovers = [];
    }

    showPopover(message, title, element) {
        const popoverElement = document.createElement('div');
        popoverElement.classList.add('popover');

        popoverElement.innerHTML = `
      <div class="popover-arrow"></div>
      <h3 class="popover-header">${title}</h3>
      <div class="popover-body">${message}</div>
    `;

        document.body.appendChild(popoverElement);

        // Вычисляем координаты
        const { top, left, width } = element.getBoundingClientRect();

        // Считаем left: левый край кнопки + половина кнопки - половина поповера
        popoverElement.style.left = left + width / 2 - popoverElement.offsetWidth / 2 + 'px';
        // Считаем top: верхний край кнопки - высота поповера - отступ для стрелочки (10px)
        popoverElement.style.top = top - popoverElement.offsetHeight - 10 + 'px';

        // Сохраняем информацию о показанном поповере
        const id = performance.now();
        this._popovers.push({ id, element: popoverElement });

        return id;
    }

    removePopover(id) {
        const popover = this._popovers.find(p => p.id === id);
        if (popover) {
            popover.element.remove();
            this._popovers = this._popovers.filter(p => p.id !== id);
        }
    }
}