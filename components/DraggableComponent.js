import { useDrag } from "react-dnd";
import styles from "../styles/Home.module.css";

const DraggableComponent = ({ ...props }) => {
  const [, drag] = useDrag({
    item: { id: props.id, type: props.type },
  });
  return (
  <div ref={drag} className={styles.menuitem}>{props.children}</div>
  );
}

export default DraggableComponent;