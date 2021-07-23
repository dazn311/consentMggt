import {  makeStyles, unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';
import {ruRU} from '@material-ui/core/locale';
import {lightBlue, lightGreen, blueGrey} from '@material-ui/core/colors';

// export const darkTheme = createMuiTheme({
export const darkTheme = unstable_createMuiStrictModeTheme({
    palette: {
        primary: {
            // main: '#8bc34a9c',
            light: '#8bc00a9c',
            main: lightGreen[500],
            dark: lightGreen[700],
            // dark: '#8bc34a9c',
        },
        secondary: {
            light: '#8bc44a9c',
            main: '#8bc00a9c',
            // main: lightGreen[500],
            dark: blueGrey[700]
        },
        background: {
            default: '#303030',
            // default: lightGreen[900],
            paper: '#303030',
        },
        redLight: 'rgb(234 128 128 / 60%)',
        purple: '#a4a5d8',
        type: 'dark'
    },

}, ruRU);

// export const lightTheme = createMuiTheme({
export const lightTheme = unstable_createMuiStrictModeTheme({
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
            default: '#fff',
            // paper: 'grey',
        },
        redLight: 'rgb(234 128 128 / 60%)',
        purple: '#a4a5d8',
        type: 'light'
    },

}, ruRU);

export const styles = makeStyles((theme) => ({
    root: {
        width: 'calc(100% - 84px)',
        // maxWidth: 1200,
        backgroundColor: theme.palette.background,
        marginLeft: 84,
        overflow: 'auto'
    },
    container: {
        backgroundColor: theme.palette.background,
        // display: 'flex',
        // minWidth: '100%'
        // marginLeft: 240
    },
}));

const objStyles = {lightTheme, darkTheme, styles}
export default objStyles