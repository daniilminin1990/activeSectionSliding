import s from './LayoutSplit.module.scss';
import {Outlet} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

type Block = {
  id: number;
  title: string;
  content: string;
  additionalContent?: string;
};

export const blocks: Block[] = [
  { id: 1, title: 'Блок 1', content: 'Содержимое блока 1', additionalContent: 'Дополнительное содержимое блока 1' },
  { id: 2, title: 'Блок 2', content: 'Содержимое блока 2', additionalContent: 'Дополнительное содержимое блока 2'  },
  { id: 3, title: 'Блок 3', content: 'Содержимое блока 3', additionalContent: 'Дополнительное содержимое блока 3'  },
  { id: 4, title: 'Блок 4', content: 'Содержимое блока 4', additionalContent: 'Дополнительное содержимое блока 4'  },
  { id: 5, title: 'Блок 5', content: 'Содержимое блока 5', additionalContent: 'Дополнительное содержимое блока 5'  },
];

export const LayoutSplit = () => {
  // Состояние для активного блока
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  // Ref для main, чтобы отслеживать скролл
  const mainRef = useRef<HTMLElement>(null);

  // Обработчик клика по элементу в nav
  const handleNavClick = (index: number) => {
    const blockElement = document.getElementById(`block-${index}`);
    if (blockElement) {
      blockElement.scrollIntoView({ behavior: "smooth" });
      setActiveBlock(index); // Устанавливаем активный блок при клике
    }
  };

  // Обработчик скроллинга в main
  const handleScroll = () => {
    if (mainRef.current) {
      const mainTop = mainRef.current.getBoundingClientRect().top;
      const mainHeight = mainRef.current.clientHeight;

      blocks.forEach((_, index) => {
        const blockElement = document.getElementById(`block-${index}`);
        if (blockElement) {
          const blockRect = blockElement.getBoundingClientRect();
          const blockTop = blockRect.top - mainTop;
          const blockBottom = blockRect.bottom - mainTop;

          // Проверяем, находится ли блок в видимой области
          if (blockTop < mainHeight / 2 && blockBottom > mainHeight / 2) {
            setActiveBlock(index);
          }
        }
      });
    }
  };

  // Добавляем слушатель скролла
  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
      return () => mainElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div>
      <header>
        <p>Some header content</p>
      </header>
      <div className={s.container}>
        <nav className={`${s.sidebar} ${s.navContent}`}>
          {blocks.map((block, index) => (
            <p
              key={index}
              onClick={() => handleNavClick(index)}
              style={{
                cursor: "pointer",
                fontWeight: activeBlock === index ? "bold" : "normal",
                color: activeBlock === index ? "blue" : "black",
              }}
            >
              {block.title}
            </p>
          ))}
        </nav>
        <main ref={mainRef} className={s.mainContent} style={{ overflowY: "auto", maxHeight: "100vh" }}>
          <Outlet />
        </main>
        <aside className={`${s.sidebar} ${s.additionalData}`}>
          <p>additional data</p>
        </aside>
      </div>
    </div>
  );
};