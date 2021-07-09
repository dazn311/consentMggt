import React, { useState } from 'react';


import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles';
import {ruRU} from '@material-ui/core/locale';
import {lightBlue} from '@material-ui/core/colors';

import './App.styles.scss';
import RoutApp from './RoutApp'

const darkTheme = createMuiTheme({
    palette: {
        primary: {
            // main: lightGreen[500],
            // dark: lightGreen[700],
            main: '#8bc34a9c',
            // dark: '#8bc34a9c',
        },
        secondary: {
            // main: lightGreen[500],
            main: '#8bc00a9c',
            // dark: blueGrey[700]
        },
        background: {
            default: '#303030',
            // default: lightGreen[900],
            // paper: 'grey',
        },
        redLight: 'rgb(234 128 128 / 60%)',
        purple: '#a4a5d8',
        type: 'dark'
    },


}, ruRU);

const lightTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#1769aa',
            main: '#1769aa',
        },
        secondary: {
            light: lightBlue[500],
            main: lightBlue[500],
        },
        background: {
            default: 'white',
            // paper: 'grey',
        },
        redLight: 'rgb(234 128 128 / 60%)',
        purple: '#a4a5d8',
        type: 'light'
    },

}, ruRU);

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'calc(100% - 64px)',
        backgroundColor: theme.palette.background,
        marginLeft: 64
    },
    container: {
        backgroundColor: theme.palette.background,
        // display: 'flex',
        // minWidth: '100%'
        // marginLeft: 240
    },
}));

const App = () => {
    const [darkThemeS, setDarkThemeS] = useState(true);
    const [themeS, setThemeS] = useState(darkTheme);
    const classes = useStyles();

    const setTheme = () => {
        setThemeS(lightTheme);
    }
    console.log('reload app')
    return (
        <ThemeProvider theme={themeS}>
            <div id='app-f' className={classes.root}>
                <RoutApp setTheme={setTheme} />
            </div>
        </ThemeProvider>
    );
}

export default App
