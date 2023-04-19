import { addTodo } from "../utils/wallet";
import { completeTodo } from "../utils/wallet";
import React from 'react';


class ToDoList extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
          newItem: "",
          list: []
        }
      }
    
      /* this is Add item function */
      addItem(todoValue) {
        if (todoValue !== "") {
          addTodo(todoValue);
          const newItem = {
            id: Date.now(),
            value: todoValue,
            isDone: false
          };
          const list = [...this.state.list];
          list.push(newItem);
          this.setState({ // update state
            list: list,
            newItem: ""
          });
        }
      }
    
      /* This is Delete Item function*/
      deleteItem(id) {
        const list = [...this.state.list];  // append to list
        const updated_list = list.filter(item => item.id !== id); // remove item which match with id
        this.setState({
          list: updated_list
        })
      }
      // this function used to get new item  
      updateInput(input) {
        this.setState({ newItem: input });
      }
  render() {
    return (
      <div>

        <div className="container">

          <input type="text"
            className="input-text"
            placeholder="Write a todo"
            value={this.state.newItem}
            onChange={e => this.updateInput(e.target.value)} />

          <button className="add-btn"
            onClick={() => {var newtodo=this.state.newItem; this.addItem(newtodo); }}
            disabled={!this.state.newItem.length}>Add Todo</button>

          <div className="list">
            <ul>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    {" "+ item.value}
                    <button className="btn" onClick={() => {this.deleteItem(item.id);  completeTodo(item.value);} }>Complete</button>
                  </li>
                );
              })}
            </ul>

          </div>
        </div>
      </div>
    );
  }
}
export default ToDoList;
