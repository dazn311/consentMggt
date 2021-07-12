
        let winWidth = window.innerWidth;
        let widthLine = 280,
        leftLine = 15,
        rightLine = 15,
        displayVal = 'none',
         mLeft = -35,
         mBottom = -0,
         mRight = 20



        if ( winWidth === 320) {
             widthLine = 280;
             leftLine = 15;
             rightLine = 15;
             displayVal = 'none';
              mLeft = -35;
              mBottom = -0;
              mRight = 20;
        } else if ( winWidth === 375) {
             widthLine = 340;
             leftLine = 10;
             rightLine = 20;
             displayVal = 'none';
              mLeft = -35;
              mBottom = -0;
              mRight = 10;
        } else if ( winWidth === 414) {
             widthLine = 370;
             leftLine = 10;
             rightLine = 20;
             displayVal = 'none';
              mLeft = -35;
              mBottom = -0;
              mRight = 0;
        } else if ( winWidth === 412) { // Samsung A51
             widthLine = 360;
             leftLine = 10;
             rightLine = 20;
             displayVal = 'none';
              mLeft = -35;
              mBottom = -0;
              mRight = 0;
        } else if ( winWidth === 360) { // Samsung A51
             widthLine = 320;
             leftLine = 10;
             rightLine = 20;
             displayVal = 'none';
              mLeft = -35;
              mBottom = -0;
              mRight = 0;
        } else if ( winWidth > 1024 && winWidth < 1224) { // Samsung A51
             widthLine = 450;
             leftLine = 10;
             rightLine = 20;
             displayVal = 'flex';
              mLeft = -35;
              mBottom = -0;
              mRight = 0;
        } else if ( winWidth > 1224) { // Samsung A51
             widthLine = 550;
             leftLine = 15;
             rightLine = 20;
             displayVal = 'flex';
              mLeft = -25;
              mBottom = -0;
              mRight = 10;
        }

        const styleLblUsers2 =  { position: 'relative', color: 'green', display:  displayVal, alignItems: 'flex-start', justifyContent: 'center', maxHeight: 25 }

        const styleLblUsers =   { position: 'relative', color: 'white',  display:  displayVal,  backgroundColor: '#8884d8', width: '30px', height: 30,  margin: '4px 25px'  }

        const styleLblEvents =  { position: 'relative', color: 'black', display:  displayVal, backgroundColor: 'rgb(130, 202, 157)',  width: '30px', height: 30, margin: '4px 25px' }


        const styleLblEnded =  {position: 'relative',color: 'black', display:  displayVal,backgroundColor: '#FFc000',width: '30px',height: 30, margin: '4px 25px'}


        const styleBtnUpdateUsers =  {position: 'relative', display:  displayVal, cursor: 'pointer', transition: 'transform 0.2s'}

        // console.log('winWidth',winWidth)
        // console.log('widthLine, leftLine, rightLine,  mLeft,  mBottom,  mRight',widthLine, leftLine, rightLine,  mLeft,  mBottom,  mRight)

const LineChartStyles = { styleLblUsers2, styleLblUsers,  styleLblEvents, styleLblEnded, styleBtnUpdateUsers, displayVal,  widthLine, leftLine, rightLine,  mLeft,  mBottom,  mRight }
export default LineChartStyles;
 