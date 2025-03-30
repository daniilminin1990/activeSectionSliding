import s from "./LayoutSplit.module.scss";
import {Outlet} from "react-router-dom";

export const blocks = [
  'block1',
  'block2',
  'block3',
  'block4',
]

export const LayoutSplit = () => {
  return (
    <div>
      <header>
        <p>Some header content</p>
      </header>
      <div className={s.container}>
        <nav className={`${s.sidebar} ${s.navContent}`}>
          {
            blocks.map((block, index) => (
              <p key={index}>{block}</p>
            ))
          }
        </nav>
        <main className={s.mainContent}>
          <Outlet/>
        </main>
        <aside className={`${s.sidebar} ${s.additionalData}`}>
          <p>additional data</p>
        </aside>
      </div>
    </div>
  )
}