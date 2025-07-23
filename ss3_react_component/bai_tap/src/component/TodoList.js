import React, {Component} from "react";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list || [],
            new: {todo: ''}
        }
    }

    handleOnChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            new: {
                ...this.state.new,
                [name]: value
            }
        })
    }

    handleAdd = () => {
        const { todo } = this.state.new;
        if (todo.trim() === '') return;

        this.setState(prevState => ({
            list: [...prevState.list, todo.trim()],
            new: { todo: '' }
        }));
    };

    render() {
        const {list, new: newTodo } = this.state;
        return (
            <div>
                <input
                    type="text"
                    name="todo"
                    value={newTodo.todo}
                    onChange={this.handleOnChange}
                    placeholder="Thêm công việc..."
                />
                <button onClick={this.handleAdd}>Thêm</button>
                <ul>
                    {list.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default TodoList;