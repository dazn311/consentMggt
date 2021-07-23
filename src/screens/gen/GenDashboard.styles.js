import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useGenStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 0
  },
  appBarSpacer: {...theme.mixins.toolbar,
    minHeight: 44,
    '@media (min-width: 600px)':{
      minHeight: 44,
    }
  },
  content: {
    // flexGrow: 1,
    // height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    // minWidth: 1400,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    // marginLeft: -10 //нижняя таблица первой страницы
  },news: {
    '&:hover': {
      background: "#f00",
   },
  },
  fixedHeight: {
    // height: 240,
  },
}));

export default useGenStyles
