import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import C from '../../consts';
import E from '../../events';
import Avatar from '../Avatar';

const UsersBar = ({ onChoose = f => f, socket, className }) => {
  const [users, setUsers] = useState([]);

  useEffect(function() {
    const fetchUsers = async () => {
      const response = await axios(`${C.SOCKET_URL}/users`);
      setUsers(response.data);
    };
    fetchUsers();

    const chooseHandle = ({ id }) => {
      setUsers(users =>
        users.map(user =>
          user.id === id
            ? {
                ...user,
                available: false
              }
            : user
        )
      );
    };

    const enableHandle = ({ id }) => {
      setUsers(users =>
        users.map(user =>
          user.id === id
            ? {
                ...user,
                available: true
              }
            : user
        )
      );
    };

    socket.on(E.ENABLE_USER_FROM_SERVER, enableHandle);
    socket.on(E.CHOOSE_USER_FROM_SERVER, chooseHandle);

    return () => {
      socket.off(E.CHOOSE_USER_FROM_SERVER, chooseHandle);
      socket.off(E.ENABLE_USER_FROM_SERVER, enableHandle);
    };
  }, []);

  if (users.length < 1) {
    return 'Loading...';
  }

  return (
    <ul style={{display: 'flex'}} className={className}>

      {users.map((user, i) => (
        <li key={i}>
          <Avatar
            src={`${C.IMAGES_FOLDER_URL}/${user.avatar}`}
            online={!user.available}
            orgName={user.orgName}
            size={'medium'}
            onChoose={() => {return user.available && onChoose(user)}}
          />
          <h4 style={{color: !user.available && 'grey'}} >{`${user.name}`}</h4>
          {/* {user.available ? (
            <button onClick={() => onChoose(user)}>Выбрать</button>
          ) : (
            <button disabled>Занят</button>
          )} */}
        </li>
      ))}
    </ul>
  );
};


const StyledUsersBar = styled(UsersBar)`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  margin-bottom: 10px;
  margin-top: -10px;
  > li > h4 {
    font-size: 0.725em;
    margin-top: 20px;
    height: 24px;
  }
  > li > button {
    border: none;
    border-radius: 10px;
    padding: 0.4em 1.4em;
    font-size: 0.675em;
    background: linear-gradient(-45deg, blue 0%, darkblue 50%);
    color: #fff;
    font-weight: 700;
    min-width: 80px;
    border-width: unset;
    cursor: pointer;
    &:disabled {
      background: #ddd;
      color: #666;
      cursor: not-allowed;
    }
  }
`;

export default StyledUsersBar;
// export default UsersBar;
