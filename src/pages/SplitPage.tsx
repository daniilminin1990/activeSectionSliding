import { observer } from 'mobx-react-lite';
import {useRef, useState} from "react";
import {Group} from "../components/LayoutSplit.tsx";
import s from "../components/LayoutSplit.module.scss";

export const SplitPage = observer(() => {
  // const groups = useOutletContext<Group[]>(); // Получаем blocks из Outlet

  const groups: Group[] = [
    { id: 1, title: 'Блок 1', content: 'Содержимое блока 1', additionalContent: 'Дополнительное содержимое блока 1' },
    { id: 2, title: 'Блок 2', content: 'Содержимое блока 2', additionalContent: 'Дополнительное содержимое блока 2'  },
    { id: 3, title: 'Блок 3', content: 'Содержимое блока 3', additionalContent: 'Дополнительное содержимое блока 3'  },
    { id: 4, title: 'Блок 4', content: 'Содержимое блока 4', additionalContent: 'Дополнительное содержимое блока 4'  },
    { id: 5, title: 'Блок 5', content: 'Содержимое блока 5', additionalContent: 'Дополнительное содержимое блока 5'  },
  ];
  
  const [activeGroupId, setActiveGroupId] = useState<number | null>(1);

  // Обработчик клика по элементу навигации
  const handleClick = (id: number) => {
    const groupElement = document.getElementById(id.toString());
    if (groupElement) {
      const headerHeight = 50; // Высота header
      const groupPosition = groupElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      // Устанавливаем активный блок
      // navigationStore.setActiveGroupId(id);
      setActiveGroupId(id);

      // Прокручиваем к блоку
      window.scrollTo({ top: groupPosition, behavior: 'smooth' });
    }
  };

  return (
    <main>
      <div className={s.container}>
        <nav className={`${s.sidebar} ${s.navContent}`}>
          {groups.map((group) => (
            <p
              key={group.id}
              onClick={() => handleClick(group.id)}
              style={{
                cursor: 'pointer',
                fontWeight: activeGroupId === group.id ? 'bold' : 'normal',
                color: activeGroupId === group.id ? 'blue' : 'black',
              }}
            >
              {group.title}
            </p>
          ))}
        </nav>
        <main className={s.mainContent}>
          {/*<SplitPage blocks={blocks}/>*/}
          {groups.map((group) => (
            <BlockItem
              key={group.id}
              group={group}
              activeGroupId={activeGroupId}
              handleClick={handleClick}
            />
          ))}
        </main>
        <aside className={`${s.sidebar} ${s.additionalData}`}>
          {groups.find(el => el.id === activeGroupId)?.additionalContent}
        </aside>
      </div>
    </main>
  );
});

const BlockItem = ({ group, activeGroupId, handleClick }: { group: Group; activeGroupId: number | null; handleClick: (id: number) => void }) => {
  const groupRef = useRef<HTMLDivElement | null>(null);

  // Обработчик клика по блоку
  const handleGroupClick = () => {
    if (activeGroupId === group.id) {
      return
    }
    handleClick(group.id);
    // navigationStore.setActiveGroupId(group.id);
    // // Прокрутка к блоку при клике (опционально, если требуется)
    // const groupElement = groupRef.current;
    // if (groupElement) {
    //   const headerHeight = 50; // Высота header
    //   const groupPosition = groupElement.getBoundingClientRect().top + window.scrollY - headerHeight;
    //   window.scrollTo({top: groupPosition, behavior: 'smooth'});
    // }
  };

  // Определяем стиль рамки: красный для активного блока, синий для неактивного
  const borderStyle = activeGroupId === group.id ? '1px solid red' : '1px solid blue';

  return (
    <div
      id={String(group.id)}
      ref={groupRef}
      style={{ height: '300px', border: borderStyle }}
      onClick={handleGroupClick}
    >
      <h2>{group.title}</h2>
      <p>{group.content}</p>
    </div>
  );
}

// import { observer } from 'mobx-react-lite';
// import { navigationStore } from '../store/navigationStore';
// import {useOutletContext} from "react-router-dom";
// import {useRef} from "react";
//
// type Block = {
//   id: number;
//   title: string;
//   content: string;
// };
//
// export const SplitPage = observer(() => {
//   const blocks = useOutletContext<Block[]>(); // Получаем blocks из Outlet
//
//   return (
//     <main>
//       {blocks.map((block) => (
//         <BlockItem key={block.id} block={block} />
//       ))}
//     </main>
//   );
// });
//
// const BlockItem = observer(({ block }: { block: Block }) => {
//   // const intersectionRef = useRef<HTMLDivElement | null>(null);
//   // const intersection = useIntersection(intersectionRef as RefObject<HTMLElement>, {
//   //   // threshold: 1,
//   //   threshold: 0.5, // Блок считается видимым, если 50% его площади в области видимости
//   //   rootMargin: '-50px 0px 0px 0px', // Учитываем высоту header (50px)
//   // });
//   //
//   // useEffect(() => {
//   //   // Активируем блок только если он виден, нет скролла и это не начальная загрузка
//   //   if (
//   //     intersection?.isIntersecting &&
//   //     !navigationStore.isScrolling &&
//   //     !navigationStore.isInitialLoad
//   //   ) {
//   //     navigationStore.setActiveBlockId(block.id);
//   //   }
//   // }, [intersection?.isIntersecting, block.id]);
//
//   // // Обработчик клика по блоку
//   // const handleBlockClick = () => {
//   //   navigationStore.setActiveBlockId(block.id);
//   // };
//
//
//   const blockRef = useRef<HTMLDivElement | null>(null);
//
//   // Обработчик клика по блоку
//   const handleBlockClick = () => {
//     if (navigationStore.activeBlockId === block.id) {
//       return
//     }
//     navigationStore.setActiveBlockId(block.id);
//     // Прокрутка к блоку при клике (опционально, если требуется)
//     const blockElement = blockRef.current;
//     if (blockElement) {
//       const headerHeight = 50; // Высота header
//       const blockPosition = blockElement.getBoundingClientRect().top + window.scrollY - headerHeight;
//       window.scrollTo({ top: blockPosition, behavior: 'smooth' });
//     }
//   };
//
//   // Определяем стиль рамки: красный для активного блока, синий для неактивного
//   const borderStyle = navigationStore.activeBlockId === block.id ? '1px solid red' : '1px solid blue';
//
//   return (
//     <div
//       id={`block-${block.id}`}
//       // ref={intersectionRef}
//       ref={blockRef}
//       style={{ height: '300px', border: borderStyle }}
//       onClick={handleBlockClick}
//     >
//       <h2>{block.title}</h2>
//       <p>{block.content}</p>
//     </div>
//   );
// });
//
