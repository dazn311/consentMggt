import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { useLocation } from "react-router-dom";

// import Header from '../../components/header/header.component';
import TabMenu from './TabMenu'
   
import './userDetails.styles.scss';

 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 0
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '91vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
  }, 
}));
 
export default function UserCard({eventShortPoints, idUser}) {
  const classes = useStyles();
  const location = useLocation();
  const curUser = location.row;
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <Header /> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container 
          maxWidth={false}
          className={classes.container}>
          <Grid container >
            
            {/* Recent Orders */}
            <Grid item sm={12} md={12} xs={12}>
              <Paper className={classes.paper}>
                <TabMenu idUser={idUser} curUser={curUser} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
