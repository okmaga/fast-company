import React, {useState} from 'react';
import api from '../api'
const Users = () => {

    const [users, setUsers] = useState(api.users.fetchAll());

    const columns = {
        name: "Имя",
        qualities: "Качества",
        profession: "Профессия",
        completedMeetings: "Встретился, раз",
        rate: "Оценка",
        deleteButton: ''
    }
    const handleDelete = (userId) => {
        setUsers((prev) => {
            return prev.filter(user => {
                return user._id !== userId;
            })
        })

    }

    const renderPhrase = (number) => {
        if (!number) return `Никто не тусанет с тобой сегодня`
        return `${number} человек тусанут с тобой сегодня`
    }

    return (
        <>
        <h2>
            <span className={`badge ${users.length ? "bg-primary" : "bg-danger"}` }
            >{renderPhrase(users.length)}</span>
        </h2>
            {users.length > 0 && <table className="table">
                <thead>
                <tr>
                    {Object.entries(columns).map(entry => {
                        return <th key={entry[0]}>{entry[1]}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return (
                        <tr key={user._id}>
                            <td>{user.name} </td>

                            <td>{user.qualities.map(quality => {
                                return <span
                                    key={quality._id}
                                    className={`badge m-1 text-bg-${quality.color}`}
                                >{quality.name}</span>
                            })}
                            </td>

                            <td>{user.profession.name}</td>

                            <td>{user.completedMeetings}</td>
                            <td>{user.rate} / 5</td>
                            <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(user._id)}
                                    >delete</button>
                            </td>
                        </tr>
                    )
                })}

                </tbody>
        </table>}
        </>
    );
};

export default Users;
