import React, {useState} from 'react';
import {observer} from 'mobx-react'
import stateObjsMobx from "../../../../../store/consent/objsConsent/objsCons.mobx";
//import ChatRoom from "./ChatRoom/ChatRoom";

const CanvasEvents = ({switchDraw}) => {
    const [isStartDraw, setIsStartDraw] = React.useState(false)
    // const [isDrawing,setIsDrawing] = useState(false)
    // let canvasRef = React.useRef<HTMLCanvasElement>(null)
    // let contextRef = React.useRef<CanvasRenderingContext2D>(null)
    let canvasRef = React.useRef(null)
    let contextRef = React.useRef(null)

    const setIsShow = () => {
        // setIsDrawing(!isDrawing)
        // switchDraw()
        stateObjsMobx.showCanvas = !stateObjsMobx.showCanvas
    }
    // React.useEffect()
    React.useEffect(() => {
        const canvas = canvasRef.current
        // canvas.width = 550//window.innerWidth
        // canvas.height = 550//window.innerHeight
        // canvas.style.width = `${550}px`
        // canvas.style.height = `${550}px`
        canvas.style.backgroundColor = `transparent`

        const context = canvas.getContext('2d')
        context.scale(1,1)
        context.lineCap = 'round'
        context.strokeStyle = 'red'
        context.lineWidth = 5
        contextRef.current  = context


        document.querySelector('.leaflet-pane.leaflet-map-pane').append(canvasRef.current)
        // const elDiv = document.createElement('div')
        // canvas.onclick = function(event) {
        //     // Do cool things here
        //     event.cancelBubble = true;
        // }

    }, [])


    return (
        <div style={{ backgroundColor: 'transparent',width:  '100%' , height: 20 , position: 'absolute', top: 0, right: 0, zIndex: stateObjsMobx.showCanvas ? 500 : 400}} >
            <button style={{backgroundColor: stateObjsMobx.showCanvas ? 'green': 'grey',zIndex: 500, marginLeft: 300, marginRight: 4}} onClick={() => setIsShow()} >{stateObjsMobx.showCanvas ? 'остановить добавление' : 'Добавить собитие'}</button>
            <button style={{backgroundColor: stateObjsMobx.showCanvas ? 'green': 'grey',zIndex: 500}} onClick={clearDraw} >Очистить</button>
            <canvas width={  550  } height={  stateObjsMobx.showCanvas ?  950 : 5   } style={{ height:stateObjsMobx.showCanvas ?  950 : 5, backgroundColor: 'transparent',zIndex: stateObjsMobx.showCanvas ? 400 : 300, position: 'absolute', top: 0, left: 0}}  onMouseDown={startDraw} onMouseUp={endDraw} onMouseMove={drawing} ref={canvasRef}/>
        </div>
    );

    function clearDraw() {
        contextRef.current.clearRect(0,0, 550, 550)
    }
    function startDraw(e) {
        // e.preventDefault()
        // console.log('e draw',e)
        // e.stopPropagation()
        // contextRef.current.setCapture(true)
        if(e.altKey && stateObjsMobx.showCanvas){

            setIsStartDraw(true)
            contextRef.current.strokeStyle = 'red'
            contextRef.current.lineWidth = 5
            contextRef.current.beginPath()
            contextRef.current.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY)
        }
    }

    function drawing(e) {
        if(isStartDraw){
            contextRef.current.lineTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY)
            contextRef.current.stroke()
        }

    }

    function endDraw() {
        // contextRef.current.setCapture(false)
        // if(stateObjsMobx.showCanvas && isStartDraw){

        // contextRef.current.event.cancelBubble()
        // }
        // setIsDraw(false)
        contextRef.current.closePath()
        setIsStartDraw(false)
    }


}
export default observer(CanvasEvents)