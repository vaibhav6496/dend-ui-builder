import '../styles/globals.css'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { StateProvider } from "../hooks/ComponentContext"

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <DndProvider backend={HTML5Backend} >
        <Component {...pageProps} />
      </DndProvider>
    </StateProvider>
  )
}

export default MyApp
