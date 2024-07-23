import { RouterProvider } from "react-router-dom"
import { Layout } from "./components/layout"
import { router } from "./lib/consts/router"

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
