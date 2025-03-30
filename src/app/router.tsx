import {createBrowserRouter} from "react-router-dom";
import {SplitPage} from "../pages/SplitPage.tsx";
import {Main} from "../pages/Main.tsx";
import {LayoutSplit} from "../components/LayoutSplit.tsx";

export const router = createBrowserRouter([
  {
    element: <Main/>,
    path: '/'
  },
  {
    element: <LayoutSplit/>,
    path: '/split',
    children: [
      {
        element: <SplitPage/>,
        path: '/split'
      },
    ]
  }
])