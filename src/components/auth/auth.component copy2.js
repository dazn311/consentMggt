
import React, { useState } from 'react';


import { connect } from 'react-redux';

import { setCurrentUser } from '../../store/user/user.actions';

import { selectCurrentUser } from '../../store/user/user.selectors'; 

import  './authComponent.styles.scss';

import  FormSignIn from '../form-signIn/form-signIn.component'
import  FormSignUp from '../form-signUp/form-signUp.component'
 
const AuthPage = ({setUser, currentUser}) => {
    const [state, setState] = useState(currentUser);
    const [auth, setAuth] = useState(true);

    const login = state ? state.login : null;
    const name = state ? state.user_fio_lit : null;
 
    const setAuthorization = () => {setAuth(!auth)}
    const setUserCurrent = ({login, password}) => {
        setUser({
            login: login,
            password: password
        }); 
        setState({login: login, password: password});
        if (login) {
            setAuth(true);
        }
        
    }
    // console.log(auth);
    return (
            
            <div className="content">
                
                <div className="wrap-auth-form">
                    {auth ? <FormSignIn setUserCurrent={setUserCurrent} setAuthorization={setAuthorization} login={login}/>: <FormSignUp setAuthorization={setAuthorization} login={login} name={name}/>}
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
