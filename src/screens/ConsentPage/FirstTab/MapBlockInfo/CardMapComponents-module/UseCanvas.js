import React, {useState} from 'react';

const useCanvas = () => {
    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = React.useRef(null)
    const contextRef = React.useRef(null)
    // let ctx;

     function activateDraw() {
        if(contextRef.current){
            return
        }
         console.log('activateDraw canvasRef',canvasRef)
         const context = canvasRef.current.getContext('2d')
         context.scale(1,1)
         context.lineCap = 'round'
         context.strokeStyle = 'red'
         context.lineWidth = 5
         contextRef.current  = context

    }
     const switchIsDraw = React.useCallback(() => {
        // if(!contextRef.current){

         // activateDraw()
        // }
         setIsDrawing(true)
    },[])


    const BntDiv = () => (<div style={{
        backgroundColor: 'rebeccapurple',
        width: '100%',
        height: 30,
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: isDrawing ? 400 : 400
    }}>
        <button disabled={isDrawing} style={{backgroundColor: isDrawing ? 'green' : 'grey', zIndex: 500, marginLeft: 300, marginRight: 4}}
                onClick={switchIsDraw}>{isDrawing ? 'остановить добавление' : 'Добавить собитие'}</button>
        <button style={{backgroundColor: isDrawing ? 'green' : 'grey', zIndex: 500}} onClick={clearDraw}>Очистить</button>
        <canvas width={isDrawing ? 550 : 550} height={isDrawing ? 550 : 550}
                style={{backgroundColor: '#00800066', position: 'absolute', top: 30, left: 0, right: 0, bottom: 0}} onMouseDown={startDraw} onMouseUp={endDraw}
                onMouseMove={drawing}

                ref={canvasRef}/>
    </div>)

    // if (isDrawing) {
        // document.querySelector('.leaflet-pane.leaflet-map-pane').append(canvasRef.current)
    // }

    function clearDraw() {
        contextRef.current.clearRect(0, 0, 550, 550)
    }

    function startDraw(e) {
        activateDraw()
        // e.preventDefault()
        // console.log('e draw',e)
        // e.stopPropagation()
        // contextRef.current.setCapture(true)
        // if(canvasRef.current === null){
        //     return
        // }
        // if (e.altKey && !!contextRef.current) {
        if (e.altKey && contextRef.current && isDrawing) {
            contextRef.current.beginPath()
            contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)

            // setIsDrawing(true)
            // contextRef.current.styles.width = '550px'
            // contextRef.current.styles.heigth = '550px'
            // canvasRef.current = <canvas />

            // document.querySelector('.leaflet-pane.leaflet-map-pane').append(canvasRef.current)
            // const context = canvasRef.current.getContext('2d')
            // context.scale(1,1)
            // context.lineCap = 'round'
            // context.strokeStyle = 'red'
            // context.lineWidth = 5
            // contextRef.current  = context


        }
    }

    function endDraw(e) {
        // if(!contextRef.current){
        //     return
        // }
        if ( e.altKey &&  !!contextRef.current && isDrawing) {
            console.log('contextRef.current',contextRef.current)
            setIsDrawing(false)
            contextRef.current.closePath()
        }
    }

    function drawing(e) {
        // e.preventDefault()
        // e.stopPropagation()
        // if(!contextRef.current){
        //     return
        // }
        if ( e.altKey &&  !!contextRef.current && isDrawing) {
            contextRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            contextRef.current.stroke()
        }

    }

    return [isDrawing, BntDiv]

}

export default useCanvas