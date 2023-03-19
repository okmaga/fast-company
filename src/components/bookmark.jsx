import React from 'react';

const BookMark = ({status, ...rest}) => {
    return (
            <i
                className={`bi bi-bookmark${status ? "-heart-fill": "" }`}
                onClick={() => rest.handleToggleBookmark(rest._id)}
            ></i>
    );
};

export default BookMark;
