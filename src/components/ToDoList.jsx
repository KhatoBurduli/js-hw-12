import React, { useState, useCallback, useRef } from 'react';
import ToDoItem from './ToDoItem.jsx';
import DoneItem from './DoneItem.jsx';
import InProgressItem from './InProgressItem.jsx';
import styles from '../ToDoList.module.css'; // Import CSS module for styling

const ToDoList = () => {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([{ id: 1, task: 'Get started with my to-do list' }]);
    const [dones, setDones] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const nextId = useRef(2);

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const addItem = (event) => {
        event.preventDefault();
        const newItem = {
            id: nextId.current,
            task: inputValue,
        };
        setItems((prevItems) => [...prevItems, newItem]);
        setInputValue('');
        nextId.current += 1;
        console.log('Added new item:', newItem);
    };

    const moveToInProgress = useCallback((id) => {
        setItems((prevItems) => {
            const itemToMove = prevItems.find((item) => item.id === id);
            console.log('Moving to in progress - item to move:', itemToMove);
            
            if (itemToMove) {
                // Check if item already exists in inProgress
                const alreadyInProgress = inProgress.some((progItem) => progItem.id === id);
                
                if (!alreadyInProgress) {
                    setInProgress((prevInProgress) => {
                        console.log('Adding to in progress:', itemToMove);
                        return [...prevInProgress, itemToMove];
                    });
                } else {
                    console.log('Item already in progress, not adding again.');
                }
                
                const updatedItems = prevItems.filter((item) => item.id !== id);
                console.log('Updated items after moving:', updatedItems);
                return updatedItems;
            } else {
                console.log('Item not found in to-do items.');
            }
            
            return prevItems;
        });
    }, [inProgress]);

    const moveToDone = useCallback((id) => {
        setInProgress((prevInProgress) => {
            const item = prevInProgress.find((item) => item.id === id);
            console.log('Moving to done:', item);
            if (item) {
                setDones((prevDones) => [...prevDones, item]);
                const updatedInProgress = prevInProgress.filter((item) => item.id !== id);
                console.log('Updated in progress:', updatedInProgress);
                return updatedInProgress;
            }
            return prevInProgress;
        });
    }, []);

    const removeFromDone = useCallback((id) => {
        console.log('Removing item from done:', id);
        setDones((prevDones) => prevDones.filter((item) => item.id !== id));
    }, []);

    return (
        <div className={styles.todoList}>
            <form onSubmit={addItem} className={styles.itemForm}>
                <input type="text" onChange={onChange} value={inputValue} />
                <button type="submit">Add To-Do Item</button>
            </form>

            <div className={styles.column}>
                <h3>To-Do Items</h3>
                {items.map((item) => (
                    <div key={item.id} className={`${styles.card} ${styles.todo}`}>
                        <div className={styles.colorLineTodo}></div>
                        <ToDoItem key={item.id} id={item.id} task={item.task} moveToInProgress={moveToInProgress} />
                    </div>
                ))}
            </div>

            <div className={styles.column}>
                <h3>In Progress Items</h3>
                {inProgress.map((item) => (
                    <div key={item.id} className={`${styles.card} ${styles.inProgress}`}>
                        <div className={styles.colorLineInProgress}></div>
                        <InProgressItem key={item.id} id={item.id} task={item.task} moveToDone={moveToDone} />
                    </div>
                ))}
            </div>

            <div className={styles.column}>
                <h3>Done Items</h3>
                {dones.map((item) => (
                    <div key={item.id} className={`${styles.card} ${styles.done}`}>
                        <div className={styles.colorLineDone}></div>
                        <DoneItem key={item.id} id={item.id} task={item.task} removeFromDone={removeFromDone} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ToDoList;
