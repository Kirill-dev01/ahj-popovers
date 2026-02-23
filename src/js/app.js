import Popover from './Popover';

const popoverFactory = new Popover();
const btn = document.querySelector('#popover-btn');

let currentPopoverId = null;

btn.addEventListener('click', (e) => {
  e.preventDefault();

  // Если поповер уже открыт — закрываем его (toggle)
  if (currentPopoverId !== null) {
    popoverFactory.removePopover(currentPopoverId);
    currentPopoverId = null;
  } else {
    // Берем текст из data-атрибутов кнопки
    const title = btn.dataset.title;
    const content = btn.dataset.content;
    currentPopoverId = popoverFactory.showPopover(content, title, btn);
  }
});