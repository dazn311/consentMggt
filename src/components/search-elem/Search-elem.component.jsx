import React, { useState } from 'react';
import { connect } from 'react-redux';

import HomeIcon from '../../components/homeIcon/homeIcon.component';

import { setCurrentPoint } from '../../store/adminPanelTrest/adminPanelTrest.actions'

import './search-elem.styles.scss';


 
const initialState = {
    inputValue: ''
}
const SearchItem = () => {
    const [state, setState] =  useState(initialState);
    const setValue = (e) => {
        // console.log('e-target-value', e.target.value);
        setState({...state, inputValue: e.target.value})
    };

    // console.log(state.inputValue);
    return (
        <div className="search">
            
            <input type='text' value={state.inputValue} placeholder='найти событие' onChange={setValue}/>
            <HomeIcon style={{ color: 'green' }} />
        </div>
        
    )
}


const mapDispatchToProps = dispatch => ({
    setCurrentPoint: item => dispatch(setCurrentPoint(item))
  });


export default connect(null, mapDispatchToProps)(SearchItem);
   