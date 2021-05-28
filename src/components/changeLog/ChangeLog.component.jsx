import React from 'react';
import clsx from 'clsx';

import { connect } from 'react-redux';


import { messagesEventPoint, statusEventPoint, eventPoints } from '../../store/adminPanelTrest/adminPanelTrest.selectors';
 
import './changeLog.styles.scss';



import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  card: {
    cursor: 'pointer',
    '&:hover': {
      background: "#ccc",
   },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  news: {
    '&:hover': {
      background: "#f00",
   },
  },
});

const Scard = ({mes, point}) => {
  const classes = useStyles(); 
  // console.log('mes', mes, point);
  const cardPaper = clsx(classes.root, classes.card);
  return(<Card className={cardPaper}>
    <CardContent>
      <Typography className={classes.title} component={'span'}  color="textSecondary" gutterBottom>
      {'21.01.2021 (16:20)'}
      </Typography>
      <Typography  >
        {point[mes.msg_rec_id].rec_name} 
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {/* {mes.msg_fio} */}
      </Typography>
      <Typography variant="body2" component="p">
      {/* {mes.msg_text}  */}
        {/* {'координаты: '}{point[mes.msg_rec_id].rec_xy}  */}
      </Typography>
    </CardContent>
    {/* <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions> */}
  </Card>)}

 const ChangeLog = ({messages, point}) => {
  const classes = useStyles();
  const newsPaper = clsx(classes.paper, classes.fixedHeight, classes.news); 
  return (
    messages.map(mes => <Scard className={newsPaper} key={mes.msg_id} mes={mes} point={point}/>)
  )};

 
  
  

  const mapStateToProps = (state) => ({ 
    messages: messagesEventPoint(state).slice(-2),
    statusEvent: statusEventPoint(state),
    point: eventPoints(state),
  })

  export default connect(mapStateToProps)(ChangeLog);
   