import React from 'react';

const ToDoItem = React.memo(({ task, id, moveToInProgress }) => {
    return (
        <div className='todo-item'>
            <p>{task}</p>
            <button onClick={() => moveToInProgress(id)}>In Progress</button>
        </div>
    );
});

export default ToDoItem;
