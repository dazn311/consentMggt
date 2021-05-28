
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';


import { connect } from 'react-redux';

import { setCurrentUser } from '../../store/user/user.actions';

import { selectCurrentUser } from '../../store/user/user.selectors'; 

import  './authComponent.styles.scss';

import  FormSignIn from '../form-signIn/form-signIn.component'
import  FormSignUp from '../form-signUp/form-signUp.component'
 
const AuthPage = ({setUser, currentUser}) => {
    const [state, setState] = useState(currentUser);
    const [auth, setAuth] = useState(false);
    const [switchForm, setSwitchForm] = useState(true);

    const login = state ? state.login : null;
    const name = state ? state.user_fio_lit : null;
 
    const setAuthorization = () => {setAuth(!auth)}
    const setSwitchFormHandel = () => {setSwitchForm(!switchForm)}
    const setUserCurrent = ({login, password}) => {
        if (login !== 'demo'){ return}

        setUser({
            login: login,
            password: password
        }); 
        setState({login: login, password: password});
        setAuth(true);
        
    }
    // console.log(auth);
    //<Redirect to="/" />     
    
    if (auth) {
        return (<Redirect to="/" />);
        
    }

    return (
            
            <div className="content">
                
                <div className="wrap-auth-form">
                    {switchForm ? <FormSignIn setUserCurrent={setUserCurrent} setAuthorization={setAuthorization} switchForm={setSwitchFormHandel} login={login}/>: <FormSignUp setAuthorization={setAuthorization} switchForm={setSwitchFormHandel} login={login} name={name}/>}
                </div>
            </div>
            
    )
}
 

const mapDispatchToProps = dispatch => ({
    setUser: item => dispatch(setCurrentUser(item))
  });

  const mapStateToProps = (state) => ({
      currentUser: selectCurrentUser(state),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
