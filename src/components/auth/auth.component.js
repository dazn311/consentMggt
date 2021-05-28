
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';


import { connect } from 'react-redux';


import { selectCurrentUser } from '../../store/user/user.selectors'; 

import  './authComponent.styles.scss';

import  FormSignIn from '../form-signIn/form-signIn.component'
import  FormSignUp from '../form-signUp/form-signUp.component'

const postData = async (url = '', data = {}) =>{
    // Default options are marked with *
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'text/html'
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    // return await response.json(); // parses JSON response into native JavaScript objects
    return await response; // parses JSON response into native JavaScript objects
};
 
const AuthPage = ({currentUser}) => {
    const [state, setState] = useState(currentUser);

    const [auth, setAuth] = useState(false);
    const [switchForm, setSwitchForm] = useState(true);

    const login = state ? state.username : null;
    const name = state ? state.user_fio_lit : null;
 
    const setAuthorization = () => {setAuth(!auth)}
    const setSwitchFormHandel = () => {setSwitchForm(!switchForm)}

    //10.02.21

    const setUserCurrent = ({username, password}) => {
        postData('http://176.53.160.74:1000/login', {username:username, password: password})
            .then((status) => {
                // console.log('status.ok', status.ok);
                if (status.ok){
                    setState({username: username});
                    localStorage.setItem('loginMGGT-status',status.ok);
                }
                
                // setAuth(true);
                
            })
            .catch(error => console.log('error',error.message) );

    }

  
    if (state) {
        return (<Redirect to="/main" />);
        
    }

    return (
            
            <div className="content">
                
                <div className="wrap-auth-form">
                    {switchForm ? <FormSignIn setUserCurrent={setUserCurrent} setAuthorization={setAuthorization} switchForm={setSwitchFormHandel} login={login}/>: <FormSignUp setAuthorization={setAuthorization} switchForm={setSwitchFormHandel} login={login} name={name}/>}
                </div>
            </div>
            
    )
}
 



  const mapStateToProps = (state) => ({
      currentUser: selectCurrentUser(state),
  });

  export default connect(mapStateToProps)(AuthPage);
