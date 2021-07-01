import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'; 

import {buildVersion} from '../buildVirsion/buildVersion'

export default function Copyright() {
    return (
      <footer>
          <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '} <Link color="inherit" href="https://mggt.ru/"> МосГеоТрест </Link>{' '}{new Date().getFullYear()}
              {'.'}<span style={{color:'grey'}} >build date: {buildVersion}</span>
          </Typography>
      </footer>
    );
  }