import {createMuiTheme, MuiThemeProvider, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SecurityIcon from "@material-ui/icons/Security";
import TextField from "@material-ui/core/TextField";
import WorkIcon from "@material-ui/icons/Work";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Button from "@material-ui/core/Button";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BuildIcon from "@material-ui/icons/Build";
import React from "react";


const themeText = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                minWidth: 220,
                width: 300,
            }
        },
        MuiInputBase : {
            input: {
                // color: 'white'
            },
        },
        MuiGrid: {
            Container: {
                flexWrap:'nowrap'
            }
        }
    },
});


export const LoginField = React.memo(({txt, changeText, dis}) => {
    // const classes = useStyles();
    const theme = useTheme();

    return(
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item style={{flexWrap: 'nowrap'}} >
                <SecurityIcon color='primary' />
            </Grid>
            <Grid item   >
                <MuiThemeProvider theme={themeText}>
                    <TextField
                        onChange={changeText}
                        inputProps={{ style: {   color: dis ? 'grey' : theme.palette.primary.main}}}
                        disabled={dis} id="input-with-icon-grid"
                        //label="Ф.И.О."
                        value={txt}
                        type={'string'}
                    />
                </MuiThemeProvider>
            </Grid>
        </Grid>
    )});

export const PostField = React.memo(({txt, changeText, dis}) => {
    // const classes = useStyles();
    const theme = useTheme();

    return(
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item style={{flexWrap: 'nowrap'}} >
                <WorkIcon color='primary' />
            </Grid>
            <Grid item   >
                <MuiThemeProvider theme={themeText}>
                    <TextField
                        onChange={changeText}
                        inputProps={{ style: {   color: dis ? 'grey' : theme.palette.primary.main}}}
                        disabled={dis} id="input-with-icon-grid"
                        //label="Ф.И.О."
                        value={txt}
                        type={'string'}
                    />
                </MuiThemeProvider>
            </Grid>
        </Grid>
    )});

export const TxtField = React.memo(({txt, changeText, dis}) => {
    // const classes = useStyles();
    const theme = useTheme();

    return(
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item style={{flexWrap: 'nowrap'}} >
                <AccountCircle color='primary' />
            </Grid>
            <Grid item   >
                <MuiThemeProvider theme={themeText}>
                    <TextField
                        onChange={changeText}
                        inputProps={{ style: {   color: dis ? 'grey' : theme.palette.primary.main}}}
                        disabled={dis} id="input-with-icon-grid"
                        //label="Ф.И.О."
                        value={txt}
                        type={'string'}
                    />
                </MuiThemeProvider>
            </Grid>
        </Grid>
    )});

export const PasswordField = React.memo(({txt, changeText, dis, genPassWord}) => {
    // const classes = useStyles();
    const theme = useTheme();

    return(
        <Grid container spacing={1} alignItems="flex-end" style={{flexWrap: 'nowrap'}} >
            <Grid item style={{flexWrap: 'nowrap'}} >
                <LockOpenIcon color='primary' />
            </Grid>
            <Grid item   >
                <MuiThemeProvider theme={themeText}>
                    <TextField
                        onChange={changeText}
                        inputProps={{ style: {   color: dis ? 'grey' : theme.palette.primary.main}}}
                        disabled={dis} id="input-with-icon-grid"
                        //   label="Ф.И.О."
                        value={txt}
                    />
                </MuiThemeProvider>
            </Grid>
            <Grid item   >
                <Button disabled={dis} onClick={genPassWord} variant="outlined"  color="secondary" style={{ maxHeight: 30}}> Ген.</Button>
            </Grid>
        </Grid>
    )});

export const PhoneField = React.memo(({txt, changeText, dis}) => {
    // const classes = useStyles();
    const themess = useTheme();

    return(
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item style={{flexWrap: 'nowrap'}} >
                <PhoneIcon color='primary' />
            </Grid>
            <Grid item   >
                <MuiThemeProvider theme={themeText}>
                    <TextField
                        onChange={changeText}
                        inputProps={{ style: {   color: dis ? 'grey' : themess.palette.primary.main}}}
                        disabled={dis} id="input-with-icon-grid"
                        //   label="Ф.И.О."
                        value={txt}
                    />
                </MuiThemeProvider>
            </Grid>
        </Grid>
    )});

export const MailField = React.memo(({txt, changeText, dis}) => {
    // const classes = useStyles();
    const themess = useTheme();

    return(
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item style={{flexWrap: 'nowrap'}} >
                <MailOutlineIcon color='primary' />
            </Grid>
            <Grid item   >
                <MuiThemeProvider theme={themeText}>
                    <TextField
                        onChange={changeText}
                        inputProps={{ style: {   color: dis ? 'grey' : themess.palette.primary.main}}}
                        disabled={dis} id="input-with-icon-grid"
                        //   label="Ф.И.О."
                        value={txt}
                    />
                </MuiThemeProvider>
            </Grid>
        </Grid>
    )});

export const RoleField = React.memo(({txt, changeText, dis}) => {
    // const classes = useStyles();
    const themess = useTheme();

    return(
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item style={{flexWrap: 'nowrap'}} >
                <BuildIcon color='primary' />
            </Grid>
            <Grid item   >
                <MuiThemeProvider theme={themeText}>
                    <TextField
                        onChange={changeText}
                        inputProps={{ style: {   color: dis ? 'grey' : themess.palette.primary.main}}}
                        disabled={dis} id="input-with-icon-grid"
                        //   label="Ф.И.О."
                        value={txt}
                    />
                </MuiThemeProvider>
            </Grid>
        </Grid>
    )});
