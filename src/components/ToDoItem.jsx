import React, { PureComponent } from 'react';

class ToDoItem extends PureComponent {
    render() {
        const { task, id, action } = this.props;
        return (
            <div className='todo-item'>
                <p>{task}</p>
                <button onClick={() => action(id)}>Done</button>
            </div>
        );
    }
}

export default ToDoItem;
