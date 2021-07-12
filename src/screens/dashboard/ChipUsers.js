import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import lodash from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";


import { selectEventShortPoints  } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
 
const  ChipUsers = ({eventShortPoints}) =>{
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([]);

  const handleDelete = (chipToDelete) => () => {
    // setChipData((chips) => chips.filter((chip) => chip.name !== chipToDelete.name));
    // setChipData([...chipData,chipData[chipToDelete] = 'none']);
  };
  console.log('eventShortPoints',eventShortPoints);

 

  React.useEffect(() => {
    
    //     date: "2021-04-16T11:43:37.158003"
                // node_local:
                // info:
                // msg_id: "36945"
                // rec_id: "9533"
                // __proto__: Object
                // __proto__: Object
                // text: "Отправка сообщения"
                // type: "new_msg"
                // user:
                    // fullname: "Зимникова Александра Андреевна"
                    // orgID: 37
                    // orgname: "ГБУ \"Мосгоргеотрест\""
                    // userID: 863
                    // username: "Зимникова А.А."

    let arUsers = [
        // {id:0, userName:'Vasya', amMess:8}
    ];
    const dateToday = new Date().toISOString().split('T')[0];

    eventShortPoints.forEach((elem) => {
        if(elem.date.split('T')[0] === dateToday){

            const inxU = arUsers.findIndex(el => el.id === elem.user.userID)
            // console.log('inxU',inxU); 

            if (inxU >= 0){
                const nObj = arUsers[inxU];
                const nObj2 = {id: nObj.id, userName: elem.user.username, amMess: nObj.amMess + 1} //{...nObj, amMess: nObj.amMess + 1}
                arUsers[inxU] = nObj2;
            }else {
                const nObj2 = {id: elem.user.userID, userName: elem.user.username, amMess:1};
                arUsers.push(nObj2);
            }

            // if(elem.user.userID === 565){
            //     arUsers.push(elem);
            // }
            
        }
        
    })   

    // console.log('arUsers',arUsers);
    arUsers = lodash.orderBy(arUsers, ['userName'], ['asc']);
    setChipData(arUsers);

  },[eventShortPoints])

 
  if (chipData.length === 0){
    return (<div style={{width:'100%', display:'flex', justifyContent:'center'}}>  <CircularProgress size={34} color="secondary" /> </div>)
  }

  let icon;
  icon = <TagFacesIcon  />; 
  console.log('chipData',chipData);

  return (
    <Paper component="ul" className={classes.root}> 
    <Chip  style={{color: 'black',backgroundColor:'#FFC000'}} label={'Активность пользователей за текущий день '}   className={classes.chip} /> 
        {chipData.map(elem => {
          return <Chip key={elem.id} style={{color: 'black',paddingLeft: 4, paddingRight: 4, borderRadius: 2,height: 'auto'}} label={elem.userName + ' (' + elem.amMess + ') '}  className={classes.chip} />
        })} 
    </Paper>
  );
}

const mapStateToProps = createStructuredSelector ({
  eventShortPoints: selectEventShortPoints, // события короткие данные для таблицы 
});


export default connect(mapStateToProps)(ChipUsers);