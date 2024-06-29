import React, { PureComponent } from 'react';

class DoneItem extends PureComponent {
    render() {
        const { task, id, action1, action2 } = this.props;
        return (
            <div className='done-item'>
                <p>{task}</p>
                <button onClick={() => action1(id)}>Remove</button>
                <button onClick={() => action2(id)}>Back</button>
            </div>
        );
    }
}

export default DoneItem;
