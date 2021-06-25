import React from 'react';
import PropTypes from 'prop-types';
import {createStructuredSelector} from "reselect";
import {
    activeObjAndRelSelector,
    fullDataOfActiveObForMapForRelativesSelector, recsDataSelector,
    relFullDataOfActiveObjSelector
} from "../../../../store/consent/cons.selectors";
import {connect} from "react-redux";
// rscp
const ChatTest = props => {
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
// disp
// function mapDispatchToProps(dispatch) {
//     return {}
// }

// export default ChatTest;

const mapStateToProps = createStructuredSelector({
    // recsDataS: recsDataSelector, // события короткие данные для таблицы
});

const mapDispatchToProps = (dispatch) => ({
    // fetchAuthUser: (userID) => dispatch(fetchAuthUserAsync(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatTest);








//
//
// import React from 'react'
// import PropTypes from 'prop-types'
// // hoc
// export default (WrappedComponent) => {
//     const hocComponent = ({...props}) => <WrappedComponent {...props} />
//
//     hocComponent.propTypes = {}
//
//     return hocComponent
// }

//cref
// this.refNameRef = React.createRef();
