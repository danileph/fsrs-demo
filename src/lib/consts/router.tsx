import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/home";
import { StatisticsPage } from "../../pages/statistics";

export const routes = [
  {
    name: "Главная",
    path: "/",
    element: <HomePage />,
  },
  {
    name: "Статистика",
    path: "/statistics",
    element: <StatisticsPage />,
  },
]

export const router = createBrowserRouter(routes.map(route => ({
  path: route.path,
  element: route.element,
})));