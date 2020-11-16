import styles from "../styles/Home.module.css"
import DraggableComponent from "./DraggableComponent"

const SideBar = () => {
    return (
        <>
          <div className={styles.sidebar}>
            <DraggableComponent id="button" type="component">Button</DraggableComponent>
            <DraggableComponent id="input" type="component">TextBox</DraggableComponent>
            <DraggableComponent id="dropdown" type="component">Dropdown</DraggableComponent>
          </div>
        </>
    )
}

export default SideBar
