import React from 'react';

const ToDoItem = React.memo(({ task, id, action }) => {
    return (
        <div className='todo-item'>
            <p>{task}</p>
            <button onClick={() => action(id)}>Done</button>
        </div>
    );
});

export default ToDoItem;
