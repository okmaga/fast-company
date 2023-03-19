import React from 'react';
import Quality from "./qualities";
import Bookmark from "./bookmark";


const User = ({user, handleDelete, handleToggleBookmark}) => {
    return (
        <tr key={user._id}>
            <td>{user.name} </td>

            <td>
                {user.qualities.map(quality => <Quality key={quality._id} {...quality}/>)}
            </td>

            <td>{user.profession.name}</td>

            <td>{user.completedMeetings}</td>
            <td>{user.rate} / 5</td>
            <td><Bookmark
                status={user?.favStatus}
                {...user}
                handleToggleBookmark={handleToggleBookmark}
            /></td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                >delete</button>
            </td>
        </tr>
    );
};

export default User;
