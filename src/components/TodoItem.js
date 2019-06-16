import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
  };

  state = {
    editing: false,
  };

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (todo, text) => {
    const { deleteTodo, editTodo } = this.props;
    if (text.length === 0) {
      deleteTodo(todo.id);
    } else {
      editTodo(todo.id, { ...todo, text });
    }
    this.setState({ editing: false });
  };

  render() {
    const { todo, editTodo, deleteTodo } = this.props;
    const { editing } = this.state;

    let element;
    if (editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={text => this.handleSave(todo, text)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => {
              editTodo(todo.id, { ...todo, completed: !todo.completed });
            }}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button type="button" className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return (
      <li
        data-cy={`todo-item-${todo.id}`}
        className={classnames({
          completed: todo.completed,
          editing,
        })}
      >
        {element}
      </li>
    );
  }
}
