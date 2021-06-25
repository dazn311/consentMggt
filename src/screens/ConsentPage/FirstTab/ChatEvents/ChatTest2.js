import React from 'react';
import PropTypes from 'prop-types';
import {connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// cfcd
const ChatTest = props => {
    //usd
    const [dfdf, setdfdf] = React.useState();

    //urefd
    const CircleRef = React.useRef(null);

    //cfd
    const hendlerdaz = () => {

    }


    return (
        <div>

        </div>
    );
};

ChatTest.propTypes = {

};


const mapStateToProps = createStructuredSelector({
    // recsDataS: recsDataSelector, // события короткие данные для таблицы
});

const mapDispatchToProps = (dispatch) => ({
    // fetchAuthUser: (userID) => dispatch(fetchAuthUserAsync(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatTest);
