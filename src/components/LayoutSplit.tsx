import { observer } from 'mobx-react-lite';
import { navigationStore } from '../store/navigationStore';
import s from './LayoutSplit.module.scss';
import {Outlet} from "react-router-dom";
import {useEffect} from "react";

type Block = {
  id: number;
  title: string;
  content: string;
  additionalContent?: string;
};

const blocks: Block[] = [
  { id: 1, title: 'Блок 1', content: 'Содержимое блока 1', additionalContent: 'Дополнительное содержимое блока 1' },
  { id: 2, title: 'Блок 2', content: 'Содержимое блока 2', additionalContent: 'Дополнительное содержимое блока 2'  },
  { id: 3, title: 'Блок 3', content: 'Содержимое блока 3', additionalContent: 'Дополнительное содержимое блока 3'  },
  { id: 4, title: 'Блок 4', content: 'Содержимое блока 4', additionalContent: 'Дополнительное содержимое блока 4'  },
  { id: 5, title: 'Блок 5', content: 'Содержимое блока 5', additionalContent: 'Дополнительное содержимое блока 5'  },
];

export const LayoutSplit = observer(() => {
  const handleNavClick = (id: number) => {
    const blockElement = document.getElementById(`block-${id}`);
    if (blockElement) {
      const headerHeight = 50; // Высота header
      const blockPosition = blockElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      // Устанавливаем флаг скроллинга и активный блок
      navigationStore.setIsScrolling(true);
      navigationStore.setActiveBlockId(id);

      // Скроллим к блоку с учетом header
      window.scrollTo({ top: blockPosition, behavior: 'smooth' });

      // После завершения скролла (через 1 секунду) включаем автоматическую активацию обратно
      setTimeout(() => navigationStore.setIsScrolling(false), 1000);
    }
  };

  // Это нужно чтобы первым активным элементом был все-таки 1 блок, а не 3ый (если этого не сделать, то будет первым активынм Блок 3)
  useEffect(() => {
    // Сбрасываем isInitialLoad при первом скролле
    const handleFirstScroll = () => {
      navigationStore.setIsInitialLoad(false);
      window.removeEventListener('scroll', handleFirstScroll);
    };

    window.addEventListener('scroll', handleFirstScroll);
    return () => window.removeEventListener('scroll', handleFirstScroll);
  }, []);

  return (
    <div>
      <header style={{position: 'sticky', top: 0, height: '50px', zIndex: 99, backgroundColor: 'black'}}>
        <p>Some header content</p>
      </header>
      <div className={s.container}>
        <nav className={`${s.sidebar} ${s.navContent}`}>
          {blocks.map((block) => (
            <p
              key={block.id}
              onClick={() => handleNavClick(block.id)}
              style={{
                cursor: 'pointer',
                fontWeight: navigationStore.activeBlockId === block.id ? 'bold' : 'normal',
                color: navigationStore.activeBlockId === block.id ? 'blue' : 'black',
              }}
            >
              {block.title}
            </p>
          ))}
        </nav>
        <main className={s.mainContent}>
          {/*<SplitPage blocks={blocks}/>*/}
          <Outlet context={blocks}/>
        </main>
        <aside className={`${s.sidebar} ${s.additionalData}`}>
          {blocks.find(el => el.id === navigationStore.activeBlockId)?.additionalContent}
        </aside>
      </div>
    </div>
  );
});