import React from 'react';

import Avatar from '../Avatar';
import C from '../../consts';

const OnlineUserBar = ({ user, className }) => {
  return (
    <div className={className}>
      <Avatar src={`${C.IMAGES_FOLDER_URL}/${user.avatar}`} orgName={user.orgName} online />
      <span>
        <b>{`${user.name}`}</b>
      </span>
    </div>
  );
};



export default OnlineUserBar;
