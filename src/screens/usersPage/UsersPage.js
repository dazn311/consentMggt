import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// import Header from '../../components/header/header.component';
import TabMenu from './TabMenu'

import './usersPage.styles.scss';

 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBarSpacer: {...theme.mixins.toolbar, minHeight: 34,
    '@media (min-width: 600px)':{
      minHeight: 44,
    }
  },
  content: {
    flexGrow: 1,
    height: '92vh',
    overflow: 'auto', 
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));
//<UsersPage eventShortPoints={eventShortPoints}/>

export default function UsersPage({eventShortPoints}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <Header /> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={0}>
            
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TabMenu />
              </Paper>
            </Grid>
          </Grid>
          {/*<Box pt={4}>*/}
          {/*  <Copyright />*/}
          {/*</Box>*/}
        </Container>
      </main>
    </div>
  );
}
