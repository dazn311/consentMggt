import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Link from '@material-ui/core/Link';

import {useLocation, withRouter} from "react-router-dom";

// import TabMenuConsent from "./TabMenuConsent";
import TabFirstConsent from "./FirstTab/TabFirstConsent";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 0
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '92vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
//<HistoryChanges eventShortPoints={eventShortPoints}/>

function ConsentPage( ) {
  const classes = useStyles()
  return (
    <div  className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TabFirstConsent  />
                {/*<TabMenuConsent idObj={idObj}  />*/}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default  ConsentPage