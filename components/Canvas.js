import styles from "../styles/Home.module.css"
import { useDrop } from "react-dnd"
import React, { useContext } from "react"
import Draggable from 'react-draggable'
import { Button, Dropdown, DropdownButton, FormControl } from 'react-bootstrap'
import { store } from "../hooks/ComponentContext"

const Canvas = () => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const [componentsObj, setComponentsObj] = React.useState({})
    const [buttonId, setButtonId] = React.useState(1)
    const [textBoxId, setTextBoxId] = React.useState(1)
    const [dropDownId, setDropDownId] = React.useState(1)
    React.useEffect(() => {
        const localComponentsObj = JSON.parse(localStorage.getItem('componentsObj'))
        const localButtonId = localStorage.getItem('buttonId')
        const localTextBoxId = localStorage.getItem('textBoxId')
        const localDropDownId = localStorage.getItem('dropDownId')

        if (localComponentsObj) {
            setComponentsObj(localComponentsObj)
            setButtonId(localButtonId)
            setTextBoxId(localTextBoxId)
            setDropDownId(localDropDownId)
            dispatch({ type: 'add_component', data: localComponentsObj })
        }
    }, [])

    const [, drop] = useDrop({
        accept: "component",
        drop(item, monitor) {
            const didDrop = monitor.didDrop()
            if (didDrop) {
              return;
            }
            console.log("item dropped!", item)
            console.log("Offset:",monitor.getClientOffset())
            let pos = monitor.getClientOffset()
            pos['x'] = pos['x'] - 180;
            pos['y'] = pos['y'] - 55;
            const elm = {
                id: `${item.id}${item.id === "button" ? buttonId : item.id === "input" ? textBoxId : dropDownId}`,
                left: pos['x'],
                top: pos['y'],
                type: `${item.id}`,
                text: "Button",
                cssText: "",
            }
            if (item.id === "button") setButtonId(buttonId => Number(buttonId) + 1)
            else if (item.id === "input") setTextBoxId(textBoxId => Number(textBoxId) + 1)
            else setDropDownId(dropDownId => Number(dropDownId) + 1)
            setComponentsObj(prev => ({ ...prev, [elm['id']]: elm }))
            // console.log(componentsObj)
          },
      })
    
    React.useEffect(() => {
        localStorage.setItem('componentsObj', JSON.stringify(componentsObj))
        localStorage.setItem('buttonId', buttonId)
        localStorage.setItem('textBoxId', textBoxId)
        localStorage.setItem('dropDownId', dropDownId)
        dispatch({ type: 'add_component', data: componentsObj })
    }, [componentsObj])

    const handleDragStop = (e, ui) => {
        e.preventDefault()
        const key = e['target']['id']
        if (key.length < 1) return
        const prevObj = componentsObj[key]
        console.log(e.target.id.indexOf("dropdown"))
        const targetElm = e.target.id.indexOf("dropdown") > -1 ? document.getElementById(e.target.id).parentElement : e['target']
        if (targetElm['style']['cssText']) {
            if (e.target.id.indexOf("dropdown") > -1) {
                console.log(document.getElementById(e.target.id).parentElement)
            }
            const translateText = targetElm['style']['transform']
            console.log(translateText)
            setComponentsObj(prev => ({ ...prev, [key]: {
                ...prevObj,
                cssText: translateText,
            }}))
        }
        //setComponentsObj(prev => {console.log(prev[key])})
        /*setComponentsObj(prev => ({ ...prev, [key]: {
            ...prevObj,
            left: prevObj['left'] + ui.lastX,
            top:  prevObj['top'] + ui.lastY,
        }}))*/
        /*const { x, y } = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });*/
      };

    return (
        <div ref={drop} className={styles.canvas}>
          {Object.entries(componentsObj).map(([key, value]) => 
              (
                <Draggable onStop={handleDragStop} key={key}>
                  {value['type'] === "button" ? 
                    <Button id={value['id']} style={{position: "absolute", left: value['left'], top: value['top'], transform: value["cssText"], webkitTransform: value["cssText"]}}>Button</Button> : 
                    value['type'] === "input" ? <FormControl size="sm" id={value['id']} size="sm" style={{position: "absolute", left: value['left'] - 30, top: value['top'], width: '20%', transform: value["cssText"], webkitTransform: value["cssText"]}} /> :
                    <DropdownButton id={value['id']} style={{position: "absolute", left: value['left'], top: value['top'], transform: value["cssText"], webkitTransform: value["cssText"]}} title="Dropdown button">
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                  }
                </Draggable>
              )
            )}
        </div>
    )
}

export default Canvas
