import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import {lightTheme, darkTheme, styles} from './App.styles';
import { ThemeProvider } from '@material-ui/core/styles';

import './App.styles.scss';
import RoutApp from './RoutApp'

interface AppProps {
    classes: any
}

const App: React.FC<AppProps> = ({ classes }) => {
    const [darkThemeS, setDarkThemeS] = useState(true);
    const [showApp, setShowApp] = useState(true);

    // console.log(typeof classes)
    const setTheme = () => {
        setShowApp(false)
        setDarkThemeS(!darkThemeS)
        setTimeout(() => setShowApp(true),500)
    }
    // const theme = unstable_createMuiStrictModeTheme();
    console.log('darkThemeS', darkThemeS)

    if(!showApp){
        return (<div style={{opacity: showApp ? 1 : .1 }}>Смена темы</div>)
    }

    return (
        <ThemeProvider theme={ darkThemeS ? darkTheme : lightTheme } >
            <div id='app-f' className={classes.root} >
                 <RoutApp setTheme={setTheme} />
                {/*{showApp && <RoutApp setTheme={setTheme} />}*/}
            </div>
        </ThemeProvider>
    );
}

export default withStyles(styles)(App)
