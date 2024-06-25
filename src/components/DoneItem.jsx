import React from 'react';

const DoneItem = ({ task, id, action1, action2 }) => {
    return (
        <div className='done-item'>
            <p>{task}</p>
            <button onClick={() => action1(id)}>Remove</button>
            <button onClick={() => action2(id)}>Back</button>
        </div>
    );
}

export default DoneItem
