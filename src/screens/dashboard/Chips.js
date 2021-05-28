import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
// import TagFacesIcon from '@material-ui/icons/TagFaces';
// import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

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
 
export default function ChipsArray({data}) {
  const classes = useStyles();
  // const [chipData, setChipData] = React.useState(['block','block','block','block']);

  // const handleDelete = (chipToDelete) => () => {
  //   // setChipData((chips) => chips.filter((chip) => chip.name !== chipToDelete.name));
  //   // setChipData([...chipData,chipData[chipToDelete] = 'none']);
  // };
  // console.log('data',data);


  const {total_recs,total_messages, total_sogl_objects, total_sogl_recs} = data;
  React.useEffect(() => {
    // setChipData(data);
    // console.log('21 data',data);
  },[data])


  // if (chipData.length === 0){
  //   return (<div style={{width:'100%', display:'flex', justifyContent:'center'}}>  <CircularProgress size={34} color="secondary" /> </div>)
  // }

  // let icon;
  // icon = <TagFacesIcon  />; 

  return (
    <Paper component="ul" className={classes.root}> 
        <Chip   label={ ` Всего событий ( ${total_recs} ) `}  className={classes.chip} /> 
        <Chip   label={` Всего сообщений ( ${total_messages} )`}  className={classes.chip} /> 
        <Chip    label={` Всего согл-ых объектов ( ${total_sogl_objects} )`}   className={classes.chip} /> 
        <Chip    label={` Всего согл. событий (${total_sogl_recs})`}  className={classes.chip} /> 
        {/* <Chip icon={icon} label={' Всего согл. событий' + ' (' + total_sogl_recs + ') '} onDelete={total_recs === 'React' ? undefined : handleDelete(4)} className={classes.chip} />  */}
    </Paper>
  );
}
