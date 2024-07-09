import React from 'react';

const DoneItem = ({ task, id, removeFromDone }) => {
    return (
        <div className='done-item'>
            <p>{task}</p>
            <button onClick={() => removeFromDone(id)}>Remove</button>
        </div>
    );
};

export default DoneItem;
