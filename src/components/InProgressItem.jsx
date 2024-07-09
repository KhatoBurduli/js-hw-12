import React from 'react';

const InProgressItem = ({ task, id, moveToDone }) => {
    return (
        <div className='in-progress-item'>
            <p>{task}</p>
            <button onClick={() => moveToDone(id)}>Done</button>
        </div>
    );
};

export default InProgressItem;
