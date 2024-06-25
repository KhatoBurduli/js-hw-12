import { Component } from "react";
import ToDoItem from "./ToDoItem";
import DoneItem from "./DoneItem";

class ToDoList extends Component {

    state = {
        inputValue: '',
        items: [{id: 1, task: "Get started with my to-do list"}],
        dones: []
      }

    onChange = (event) => {
        const value = event.target.value
        this.setState({
            inputValue: value
        })
    }

    addItem = (event) => {
        event.preventDefault()

        const newItem = {
            id: this.state.items.length + this.state.dones.length + 1,
            task: this.state.inputValue
        }

        this.setState({
            items: [...this.state.items, newItem],
            inputValue: '',
        })
    }

    markAsDone = (id) => {
        const item = this.state.items.find((item) => item.id === id);
        this.setState({
            items: this.state.items.filter((item) => item.id !== id),
            dones: [...this.state.dones, item]
        })
    }

    removeItem = (id) => {
        this.setState({
            dones: this.state.dones.filter((item) => item.id !== id)
        })
    } 

    backToToDo = (id) => {
        const item = this.state.dones.find((item) => item.id === id);
        this.setState({
            dones: this.state.dones.filter((item) => item.id !== id),
            items: [...this.state.items, item]
        })
    }

    render(){
        return(
            <div className="todo-list">
                <form onSubmit={this.addItem} className="item-form">
                    <input type="text" onChange={this.onChange} value={this.state.inputValue}/>
                    <button type="submit">Add To-Do Item</button>
                </form>

                <h3>To-Do Items</h3>
                {this.state.items.map((item) => (
                    <ToDoItem key={item.id} id={item.id} task={item.task} action={this.markAsDone}/>
                ))}

                <h3>Done Items</h3>
                {this.state.dones.map((item) => (
                    <DoneItem key={item.id} id={item.id} task={item.task} action1={this.removeItem} action2={this.backToToDo}/>
                ))}

            </div>
        )
    }
}

export default ToDoList