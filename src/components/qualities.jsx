import React from 'react';

const Quality = ( {color, name, _id} ) => {
    return (
            <span
                key={_id}
                className={`badge m-1 text-bg-${color}`}
            >{name}</span>
    );
};

export default Quality;
