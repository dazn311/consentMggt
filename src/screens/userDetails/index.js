
import React from 'react';
import { useParams } from 'react-router-dom'


import UserCard from './UserCard';

const UserCardPage = ({match}) => {
    let { iduser } = useParams();
    return (
            <UserCard idUser={iduser} />
    )
}
export default UserCardPage;
