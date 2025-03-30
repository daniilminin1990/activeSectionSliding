import {navigationStore} from "../store/navigationStore.ts";

export // Обработчик клика по элементу навигации
const handleClickForNavigationSidebar = (id: number) => {
  const groupElement = document.getElementById(id.toString());
  if (groupElement) {
    const headerHeight = 50; // Высота header
    const groupPosition = groupElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    // Устанавливаем активный блок
    navigationStore.setActiveGroupId(id);

    // Прокручиваем к блоку
    window.scrollTo({ top: groupPosition, behavior: 'smooth' });
  }
};