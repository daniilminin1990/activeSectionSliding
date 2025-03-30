import {RefObject, useEffect, useRef} from 'react';
import { observer } from 'mobx-react-lite';
import { useIntersection } from 'react-use';
import { navigationStore } from '../store/navigationStore';
import {useOutletContext} from "react-router-dom";

type Block = {
  id: number;
  title: string;
  content: string;
};

export const SplitPage = observer(() => {
  const blocks = useOutletContext<Block[]>(); // Получаем blocks из Outlet

  return (
    <main>
      {blocks.map((block) => (
        <BlockItem key={block.id} block={block} />
      ))}
    </main>
  );
});

const BlockItem = observer(({ block }: { block: Block }) => {
  const intersectionRef = useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(intersectionRef as RefObject<HTMLElement>, {
    // threshold: 1,
    threshold: 0.5, // Блок считается видимым, если 50% его площади в области видимости
    rootMargin: '-50px 0px 0px 0px', // Учитываем высоту header (50px)
  });

  useEffect(() => {
    // Активируем блок только если он виден, нет скролла и это не начальная загрузка
    if (
      intersection?.isIntersecting &&
      !navigationStore.isScrolling &&
      !navigationStore.isInitialLoad
    ) {
      navigationStore.setActiveBlockId(block.id);
    }
  }, [intersection?.isIntersecting, block.id]);

  // Обработчик клика по блоку
  const handleBlockClick = () => {
    navigationStore.setActiveBlockId(block.id);
  };

  // Определяем стиль рамки: красный для активного блока, синий для неактивного
  const borderStyle = navigationStore.activeBlockId === block.id ? '1px solid red' : '1px solid blue';

  return (
    <div
      id={`block-${block.id}`}
      ref={intersectionRef}
      style={{ height: '300px', border: borderStyle }}
      onClick={handleBlockClick}
    >
      <h2>{block.title}</h2>
      <p>{block.content}</p>
    </div>
  );
});