// src/stores/NavigationStore.ts
import { makeAutoObservable } from 'mobx';

class NavigationStore {
  activeBlockId: number | null = 1; // Сделаем активынм 1 блок
  isScrolling: boolean = false;
  isInitialLoad: boolean = true; // Флаг начальной загрузки

  constructor() {
    makeAutoObservable(this);
  }

  setActiveBlockId(id: number) {
    this.activeBlockId = id;
  }

  setIsScrolling(scrolling: boolean) {
    this.isScrolling = scrolling;
  }

  setIsInitialLoad(initialLoad: boolean) {
    this.isInitialLoad = initialLoad;
  }
}

export const navigationStore = new NavigationStore();

// activeBlockId хранит ID активного блока
// Метод setActiveBlockId обновляет активный блок