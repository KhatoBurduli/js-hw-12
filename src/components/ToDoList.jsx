import React, { useState, useCallback, useRef } from 'react';
import ToDoItem from './ToDoItem';
import DoneItem from './DoneItem';

const ToDoList = () => {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([{ id: 1, task: 'Get started with my to-do list' }]);
    const [dones, setDones] = useState([]);
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

    const markAsDone = useCallback((id) => {
        setItems((prevItems) => {
            const item = prevItems.find((item) => item.id === id);
            console.log('Marking as done:', item);
            if (item) {
                setDones((prevDones) => {
                    const alreadyDone = prevDones.some((doneItem) => doneItem.id === id);
                    if (!alreadyDone) {
                        const updatedDones = [...prevDones, item];
                        console.log('Updated dones:', updatedDones);
                        return updatedDones;
                    }
                    return prevDones;
                });
                const updatedItems = prevItems.filter((item) => item.id !== id);
                console.log('Updated items:', updatedItems);
                return updatedItems;
            }
            return prevItems;
        });
    }, []);

    const removeItem = useCallback((id) => {
        console.log('Removing item with id:', id);
        setDones((prevDones) => prevDones.filter((item) => item.id !== id));
    }, []);

    const backToToDo = useCallback((id) => {
        setDones((prevDones) => {
            const item = prevDones.find((item) => item.id === id);
            console.log('Returning to to-do:', item);
            if (item) {
                setItems((prevItems) => {
                    const alreadyInToDo = prevItems.some((todoItem) => todoItem.id === id);
                    if (!alreadyInToDo) {
                        const updatedItems = [...prevItems, item];
                        console.log('Updated items:', updatedItems);
                        return updatedItems;
                    }
                    return prevItems;
                });
                const updatedDones = prevDones.filter((item) => item.id !== id);
                console.log('Updated dones:', updatedDones);
                return updatedDones;
            }
            return prevDones;
        });
    }, []);

    return (
        <div className="todo-list">
            <form onSubmit={addItem} className="item-form">
                <input type="text" onChange={onChange} value={inputValue} />
                <button type="submit">Add To-Do Item</button>
            </form>

            <h3>To-Do Items</h3>
            {items.map((item) => (
                <ToDoItem key={item.id} id={item.id} task={item.task} action={markAsDone} />
            ))}

            <h3>Done Items</h3>
            {dones.map((item) => (
                <DoneItem key={item.id} id={item.id} task={item.task} action1={removeItem} action2={backToToDo} />
            ))}
        </div>
    );
};

export default ToDoList;
