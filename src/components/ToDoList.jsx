import { Component } from "react";
import ToDoItem from "./ToDoItem";
import DoneItem from "./DoneItem";

class ToDoList extends Component {
    state = {
        inputValue: '',
        items: [{ id: 1, task: "Get started with my to-do list" }],
        dones: []
    }

    onChange = (event) => {
        const value = event.target.value;
        this.setState({ inputValue: value });
    }

    addItem = (event) => {
        event.preventDefault();
        const newItem = {
            id: this.state.items.length + this.state.dones.length + 1,
            task: this.state.inputValue
        };
        this.setState((prevState) => ({
            items: [...prevState.items, newItem],
            inputValue: ''
        }));
    }

    markAsDone = (id) => {
        this.setState((prevState) => {
            const item = prevState.items.find((item) => item.id === id);
            return {
                items: prevState.items.filter((item) => item.id !== id),
                dones: [...prevState.dones, item]
            };
        });
    }

    removeItem = (id) => {
        this.setState((prevState) => ({
            dones: prevState.dones.filter((item) => item.id !== id)
        }));
    }

    backToToDo = (id) => {
        this.setState((prevState) => {
            const item = prevState.dones.find((item) => item.id === id);
            return {
                dones: prevState.dones.filter((item) => item.id !== id),
                items: [...prevState.items, item]
            };
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.items !== nextState.items || this.state.dones !== nextState.dones || this.state.inputValue !== nextState.inputValue;
    }

    render() {
        return (
            <div className="todo-list">
                <form onSubmit={this.addItem} className="item-form">
                    <input type="text" onChange={this.onChange} value={this.state.inputValue} />
                    <button type="submit">Add To-Do Item</button>
                </form>

                <h3>To-Do Items</h3>
                {this.state.items.map((item) => (
                    <ToDoItem key={item.id} id={item.id} task={item.task} action={this.markAsDone} />
                ))}

                <h3>Done Items</h3>
                {this.state.dones.map((item) => (
                    <DoneItem key={item.id} id={item.id} task={item.task} action1={this.removeItem} action2={this.backToToDo} />
                ))}
            </div>
        );
    }
}

export default ToDoList;
