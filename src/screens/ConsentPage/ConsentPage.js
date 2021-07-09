import React from 'react';
import {withRouter} from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from "./ConsentPage.styles.js";

import TabFirstConsent from "./FirstTab/TabFirstConsent";

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

export default  withRouter(ConsentPage)