import React, {useState} from 'react';
import User from "./user";
const Users = ({users, ...rest}) => {

    const columns = {
        name: "Имя",
        qualities: "Качества",
        profession: "Профессия",
        completedMeetings: "Встретился, раз",
        rate: "Оценка",
        favourite: 'Избранное',
        deleteButton: ''
    }

    return (
        <>
            {users.length > 0 && <table className="table">
                <thead>
                <tr>
                    {Object.entries(columns).map(entry => (<th key={entry[0]}>{entry[1]}</th>))}
                </tr>
                </thead>
                <tbody>
                {users.map(user => <User
                    key={user._id}
                    user={user}
                    handleDelete={rest.handleDelete}
                    handleToggleBookmark={rest.handleToggleBookmark}
                />)}
                </tbody>
        </table>}
        </>
    );
};

export default Users;
