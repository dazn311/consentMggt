import React, { useState } from "react";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import './form-signIn.styles.scss';
 


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const FormSignIn = ({login='sss',setAuthorization,setUserCurrent, switchForm}) => {
    // const setUserCurrent = ({login, password}) 
    const [loginField, setLogin] = useState(login);
    const [password, setPassword] = useState('');

    const submitLogin = (e) => {e.preventDefault(); console.log('submit'); setUserCurrent({login:loginField,password:password});};

    const handleLogin = (e) => {e.preventDefault();setLogin(e.target.value);};
    const handlePassword = (e) => {e.preventDefault(); setPassword(e.target.value);};

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  <div style={{textAlign: 'center'}}>Вход для администраторов</div>
                </Typography>
                <form className={classes.form} noValidate onSubmit={submitLogin}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="Логин"
                    name="login"
                    autoComplete="login"
                    autoFocus
                    onChange={handleLogin}
                    value={loginField}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handlePassword} 
                    value={password}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Запомнить меня"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Войти
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Забыли пароль?
                      </Link>
                    </Grid>
                    <Grid item >
                      <Link href="#" variant="body2" onClick={switchForm}>
                        {"У вас нет аккаунта? Регистрация"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
      </div>
      
    </Container>
  
        
    )
}

export default FormSignIn;